const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');

async function scrapeMembersCount() {
  // Set up the ChromeDriver
  const options = new chrome.Options();
  options.addArguments('--headless'); // Optional: To run in headless mode (no UI)
  
  // Initialize the WebDriver
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    // Replace this URL with the actual URL
    await driver.get('https://www.commudle.com/communities/builders-space/members'); // Replace with the actual URL

    // Wait for the page to load and the elements to appear
    await driver.wait(until.elementLocated(By.className('members-count')), 10000); // wait up to 10 seconds

    // Find the element containing the members count
    let membersCountElement = await driver.findElement(By.className('members-count'));

    // Get the text of the element and print it
    let membersCount = await membersCountElement.getText();
    console.log(membersCount.trim()); // Output: "269 Members"

  } catch (err) {
    console.error("Error:", err);
  } finally {
    // Close the browser
    await driver.quit();
  }
}

scrapeMembersCount();
