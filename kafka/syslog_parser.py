from pyparsing import Word, alphas, Suppress, Combine, nums, string, Optional, Regex, Group
from time import strftime
import sys
from datetime import datetime, date
import re


class Parser:
    def __init__(self):
        ip_address = Word(nums + ".")
        date = Combine(Word(alphas) + Word(" ") + Word(nums))
        time = Combine(Word(nums) + ":" + Word(nums) + ":" + Word(nums))
        hostname = Word(alphas + "_" + "-" + "." + nums)
        app = Word(alphas + nums + "/" + "_" + "-" + "." ) + Optional(Suppress("[" + Word(nums) + "]" + ":"))
        content = Regex(".*")
        self.pattern = ip_address + date + time + hostname + app + content

    def parse(self, line):
        payload = {}
        #print(line)
        try:
            parsed = self.pattern.parseString(line)
            payload["ip"]           = parsed[0]
            payload["date"]         = date.isoformat(datetime.strptime(parsed[1] + " 2016", "%b %d %Y"))
            payload["time"]         = parsed[2]
            payload["host"]         = parsed[3]
            payload["app"]          = parsed[4]
            payload["content"]      = parsed[5]
            payload["log_level"]    = Parser.get_log_level(payload["content"])
        except:
            print("error in parsing: ", sys.exc_info()[0])

        return payload

    @staticmethod
    def get_log_level(content):
        if re.search('error', content, re.IGNORECASE) or re.search('err', content, re.IGNORECASE):
            return 'ERROR'
        elif re.search('warning', content, re.IGNORECASE) or re.search('warn', content, re.IGNORECASE):
            return 'WARNING'
        else:
            return 'INFO'
