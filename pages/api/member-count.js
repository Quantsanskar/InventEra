// pages/api/member-count.js
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const options = new chrome.Options();
  options.addArguments('--headless');
  let driver;

  try {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    await driver.get('https://www.commudle.com/communities/builders-space/members');
    await driver.wait(until.elementLocated(By.className('members-count')), 10000);

    const membersCountElement = await driver.findElement(By.className('members-count'));
    const membersCountText = await membersCountElement.getText();
    const memberCount = membersCountText.match(/\d+/)[0];

    res.status(200).json({ count: memberCount });
  } catch (error) {
    console.error('Error fetching member count:', error);
    res.status(500).json({ 
      error: 'Failed to fetch member count',
      details: error.message 
    });
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}