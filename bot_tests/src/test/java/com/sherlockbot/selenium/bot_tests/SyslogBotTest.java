package test.java.com.sherlockbot.selenium.bot_tests;

import static org.junit.Assert.*;
import java.util.concurrent.TimeUnit;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class SyslogBotTest {
	//private String baseUrl;
	private static WebDriver driver;
	private static WebDriverWait wait;
	//private ScreenshotHelper screenshotHelper;
	
	@BeforeClass
    public static void openBrowser() {
		//set path of chromedriver binary. Replace by firefox driver if that's more convenient.
		System.setProperty("webdriver.chrome.driver", "C:/chromedriver.exe");
		driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        
		driver.get("https://bot-project-team.slack.com/");

		// Wait until page loads and we can see a sign in button.
		wait = new WebDriverWait(driver, 30);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("signin_btn")));

		// Find email and password fields.
		WebElement email = driver.findElement(By.id("email"));
		WebElement pw = driver.findElement(By.id("password"));

		// Type in our test user login info.
		// We will create a test user for now, but we should plan on getting it work using api tokens. 
		email.sendKeys("stongao@ncsu.edu");
		pw.sendKeys("testpw");

		// Click
		WebElement signin = driver.findElement(By.id("signin_btn"));
		signin.click();

		// Wait until we go to general channel.
		wait.until(ExpectedConditions.titleContains("general"));

	} 	
	// Test add server command - positive test case
	@Test
	public void testAddServerPositive()
	{

		// Switch to #bots channel and wait for it to load.
		driver.get("https://bot-project-team.slack.com/messages/@syslogbot/");
		wait.until(ExpectedConditions.titleContains("syslog"));

		// Post your manage command
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("manage add-server='my_web_server' ip='20.20.43.2'");
		messageBot.sendKeys(Keys.RETURN);

		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		WebElement msg = driver.findElement(
			//Check if any node names 'span' of class 'message_body' contains keyword 'server added'.
			//If it has a preceding-sibling of name 'syslog bot' it is valid reply from syslog bot.
			By.xpath("//span[@class='message_body' and contains(. , 'Server added successfully.')]/preceding-sibling::a[text()='syslogbot']"));
		assertNotNull(msg);
	}	
	// Test add server command - negative test case
	@Test
	public void testAddServerNegative()
	{

		// Switch to #bots channel and wait for it to load.
		driver.get("https://bot-project-team.slack.com/messages/@syslogbot/");
		wait.until(ExpectedConditions.titleContains("syslog"));

		// Post your manage command
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("manage add-server='my_web_server'");
		messageBot.sendKeys(Keys.RETURN);

		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		WebElement msg = driver.findElement(
			//Check if any node names 'span' of class 'message_body' contains keyword 'server added'.
			//If it has a preceding-sibling of name 'syslog bot' it is valid reply from syslog bot.
			By.xpath("//span[@class='message_body' and contains(. , 'Error adding server.')]/preceding-sibling::a[text()='syslogbot']"));
		assertNotNull(msg);
		

	}	
	// Test delete server command - positive test case
	@Test
	public void testDeleteServerPositive()
	{

		// Switch to #bots channel and wait for it to load.
		driver.get("https://bot-project-team.slack.com/messages/@syslogbot/");
		wait.until(ExpectedConditions.titleContains("syslog"));

		// Post your manage command
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("manage delete-server='my_web_server'");
		messageBot.sendKeys(Keys.RETURN);

		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		WebElement msg = driver.findElement(
			//Check if any node names 'span' of class 'message_body' contains keyword 'server added'.
			//If it has a preceding-sibling of name 'syslog bot' it is valid reply from syslog bot.
			By.xpath("//span[@class='message_body' and contains(. , 'Server deleted successfully.')]/preceding-sibling::a[text()='syslogbot']"));
		assertNotNull(msg);
		

	}
	
	// Test delete server command - negative test case
	@Test
	public void testDeleteServerNegative()
	{

		// Switch to #bots channel and wait for it to load.
		driver.get("https://bot-project-team.slack.com/messages/@syslogbot/");
		wait.until(ExpectedConditions.titleContains("syslog"));

		// Post your manage command
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("manage delete-server='not_valid'");
		messageBot.sendKeys(Keys.RETURN);

		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		WebElement msg = driver.findElement(
			//Check if any node names 'span' of class 'message_body' contains keyword 'server added'.
			//If it has a preceding-sibling of name 'syslogbot' it is valid reply from syslog bot.
			By.xpath("//span[@class='message_body' and contains(. , 'Error deleting server.')]/preceding-sibling::a[text()='syslogbot']"));
		assertNotNull(msg);
		

	}
	
	// Test query log command - positive test case
	@Test
	public void testQueryPositive()
	{

		// Switch to #bots channel and wait for it to load.
		driver.get("https://bot-project-team.slack.com/messages/@syslogbot/");
		wait.until(ExpectedConditions.titleContains("syslog"));

		// Post your manage command
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("query server='172.31.31.91' log_level='ERROR'");
		messageBot.sendKeys(Keys.RETURN);

		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		WebElement msg = driver.findElement(
			//Check if any node names 'span' of class 'message_body' contains keyword 'server added'.
			//If it has a preceding-sibling of name 'syslog bot' it is valid reply from syslog bot.
			By.xpath("//span[@class='message_body' and contains(. , '172.31.31.91')]/preceding-sibling::a[text()='syslogbot']"));
		assertNotNull(msg);
		

	}
	
	// Test query log command - negative test case
	@Test
	public void testQueryNegative()
	{

		// Switch to #bots channel and wait for it to load.
		driver.get("https://bot-project-team.slack.com/messages/@syslogbot/");
		wait.until(ExpectedConditions.titleContains("syslog"));

		// Post your manage command
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("query server='10.10.1.2' log_level='ABC'");
		messageBot.sendKeys(Keys.RETURN);

		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		WebElement msg = driver.findElement(
			//Check if any node names 'span' of class 'message_body' contains keyword 'server added'.
			//If it has a preceding-sibling of name 'syslog bot' it is valid reply from syslog bot.
			By.xpath("//span[@class='message_body' and contains(. , 'Error')]/preceding-sibling::a[text()='syslogbot']"));
		assertNotNull(msg);
		
	}
	
	
	@AfterClass
	 public static void closeBrowser() {
		 driver.quit();
	 }
}
