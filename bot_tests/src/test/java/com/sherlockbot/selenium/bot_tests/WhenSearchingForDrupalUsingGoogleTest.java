package com.sherlockbot.selenium.bot_tests;
import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertTrue;
import static org.junit.Assert.*;

import java.io.File;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

import org.apache.commons.io.FileUtils;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class WhenSearchingForDrupalUsingGoogleTest {
	//private String baseUrl;
	private static WebDriver driver;
	private static WebDriverWait wait;
	//private ScreenshotHelper screenshotHelper;
	
	@BeforeClass
    public static void openBrowser() {
		//set path of chromedriver binary. Replace by firefox driver if that's more convenient.
		System.setProperty("webdriver.chrome.driver", "C:/Program Files (x86)/chromedriver/chromedriver.exe");
		driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        
		driver.get("https://slackbotpracticeteam.slack.com/");

		// Wait until page loads and we can see a sign in button.
		wait = new WebDriverWait(driver, 30);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("signin_btn")));

		// Find email and password fields.
		WebElement email = driver.findElement(By.id("email"));
		WebElement pw = driver.findElement(By.id("password"));

		// Type in our test user login info.
		// We will create a test user for now, but we should plan on getting it work using api tokens. 
		email.sendKeys("youremail@ncsu.edu");
		pw.sendKeys("yoursupersecretpass");

		// Click
		WebElement signin = driver.findElement(By.id("signin_btn"));
		signin.click();

		// Wait until we go to general channel.
		wait.until(ExpectedConditions.titleContains("general"));

	} 
	
	// Happy path of manage command
	@Test
	public void testManageHappy()
	{

		// Switch to #bots channel and wait for it to load.
		driver.get("https://slackbotpracticeteam.slack.com/messages/@syslogbot/");
		wait.until(ExpectedConditions.titleContains("syslog"));

		// Post your manage command
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("manage server-add 10.0.0.2 dbserver");
		messageBot.sendKeys(Keys.RETURN);

		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		WebElement msg = driver.findElement(
			//Check if any node names 'span' of class 'message_body' contains keyword 'server added'.
			//If it has a preceding-sibling of name 'syslog bot' it is valid reply from syslog bot.
			By.xpath("//span[@class='message_body' and contains(. , 'server added')]/preceding-sibling::a[text()='syslog bot']"));
		assertNotNull(msg);
	}
	
	// Sad path of manage command. i.e. what if user screws up after writing manage
	@Test
	public void testManageSad() {
		driver.get("https://slackbotpracticeteam.slack.com/messages/@syslogbot/");
		wait.until(ExpectedConditions.titleContains("syslog"));

		// Type something
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("manage nothing just messing around");
		messageBot.sendKeys(Keys.RETURN);

		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		WebElement msg = driver.findElement(
			By.xpath("//span[@class='message_body' and contains(. ,'Invalid manage command')]/preceding-sibling::a[text()='syslog bot']"));
		assertNotNull(msg);
	}
	
	@Test
	public void testQueryHappy() {
		driver.get("https://slackbotpracticeteam.slack.com/messages/@syslogbot/");
		wait.until(ExpectedConditions.titleContains("syslog"));

		// Type something
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("valid query command"); //Write valid command here
		messageBot.sendKeys(Keys.RETURN);

		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		WebElement msg = driver.findElement(		//replace by query keyword
			By.xpath("//span[@class='message_body' and contains(.,'query success keyword')]/preceding-sibling::a[text()='syslog bot']"));
		assertNotNull(msg);
		
	}
	@Test
	public void testQuerySad() {
		driver.get("https://slackbotpracticeteam.slack.com/messages/@syslogbot/");
		wait.until(ExpectedConditions.titleContains("syslog"));

		// Type something
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("invalid query command");
		messageBot.sendKeys(Keys.RETURN);

		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		WebElement msg = driver.findElement(
			By.xpath("//span[@class='message_body' and contains(.,'Invalid query command')]/preceding-sibling::a[text()='syslog bot']"));
		assertNotNull(msg);
		
	}
	
	@Test
	public void testMonitorHappy() {
		driver.get("https://slackbotpracticeteam.slack.com/messages/@syslogbot/");
		wait.until(ExpectedConditions.titleContains("syslog"));

		// Type something
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("valid monitor command"); //put valid monitor command here
		messageBot.sendKeys(Keys.RETURN);

		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		WebElement msg = driver.findElement(		//replace by keyword that will be used
			By.xpath("//span[@class='message_body' contains(.,'monitor added keyword')]/preceding-sibling::a[text()='syslog bot']"));
		assertNotNull(msg);
	}
	
	@Test
	public void testMonitorSad() {
		driver.get("https://slackbotpracticeteam.slack.com/messages/@syslogbot/");
		wait.until(ExpectedConditions.titleContains("syslog"));

		// Type something
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("invalid monitor command");
		messageBot.sendKeys(Keys.RETURN);

		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		WebElement msg = driver.findElement(
			By.xpath("//span[@class='message_body' and contains(.,'Invalid monitor command')]/preceding-sibling::a[text()='syslog bot']"));
		assertNotNull(msg);
		
	}
	
	
	@Test
	public void testSummaryHappy() {
		driver.get("https://slackbotpracticeteam.slack.com/messages/@syslogbot/");
		wait.until(ExpectedConditions.titleContains("syslog"));

		// Type something
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("valid summary command"); // add a valid summary command here
		messageBot.sendKeys(Keys.RETURN);

		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		WebElement msg = driver.findElement(		//put in summary keyword here
			By.xpath("//span[@class='message_body' and contains(.,'summary keyword')]/preceding-sibling::a[text()='syslog bot']"));
		assertNotNull(msg);
		
	}
	
	@Test
	public void testSummarySad() {
		driver.get("https://slackbotpracticeteam.slack.com/messages/@syslogbot/");
		wait.until(ExpectedConditions.titleContains("syslog"));

		// Type something
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("invalid summary command"); 
		messageBot.sendKeys(Keys.RETURN);

		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		WebElement msg = driver.findElement(
			By.xpath("//span[@class='message_body' and text() = 'Invalid summary command']/preceding-sibling::a[text()='syslog bot']"));
		assertNotNull(msg);
		
	}
	
	
	@AfterClass
	 public static void closeBrowser() {
		 driver.quit();
	 }
}
