from pyparsing import Word, alphas, Suppress, Combine, nums, string, Optional, Regex, Group
from time import strftime
import sys
from datetime import datetime, date


class Parser:
    def __init__(self):
        date = Combine(Word(alphas) + Word(" ") + Word(nums))
        time = Combine(Word(nums) + ":" + Word(nums) + ":" + Word(nums))
        hostname = Word(alphas + "_" + "-" + "." + nums)
        app = Word(alphas + nums + "/" + "_" + "-" + "." ) + Optional(Suppress("[" + Word(nums) + "]" + ":"))
        content = Regex(".*")
        self.pattern = date + time + hostname + app + content

    def parse(self, line):
        payload = {}
        try:
            parsed = self.pattern.parseString(line)
            payload["date"] = date.isoformat(datetime.strptime(parsed[0] + " 2016", "%b %d %Y"))
            payload["time"] = parsed[1]
            payload["host"] = parsed[2]
            payload["app"] = parsed[3]
            payload["content"] = parsed[4]
            print payload
        except:
            print("error in parsing: ", sys.exc_info()[0])

        return payload
