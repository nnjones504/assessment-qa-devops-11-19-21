import { Builder, Capabilities, By, until } from "selenium-webdriver";
import { elementIsVisible } from "selenium-webdriver/lib/until";

require("chromedriver");

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeEach(async () => {
  driver.get("http://localhost:3000/");
});

afterAll(async () => {
  driver.quit();
});

test("Title shows up when page loads", async () => {
  const title = await driver.findElement(By.id("title"));
  const displayed = await title.isDisplayed();
  expect(displayed).toBe(true);
});

test("clicking the Draw button displays bots to select", async () => {
  const drawButton = await driver.findElement(By.id("draw"));
  await drawButton.click();

  const choices = await driver.findElement(By.id("choices"));
  const displayed = await choices.isDisplayed();
  expect(displayed).toBe(true);
});

test("Losses are displayed on home page", async () => {
    const losses = await driver.findElement(By.id("losses"));
    const displayed = await losses.isDisplayed();
    expect(displayed).toBe(true);
})

/** 
 
  TODO Get Correct Path and see if that works
  test("after the duel the player will be shown whether or not they won", async () => {
  const drawButton = await driver.findElement(By.id("draw"));
  drawButton.click();
  driver.sleep(1000);

  //   const chooseBot1 = await driver.findElement(By.className("bot-btn"));
  //   const chooseBot2 = await driver.findElement(By.className("bot-btn"));
  //   await chooseBot1.click();

  //   await chooseBot2.click();

  //   const duel = await driver.findElement(By.id("duel"));
  //   await duel.click();

  await driver
    .findElement(By.xpath())
    .click();
  driver.sleep(1000);
  await driver
    .findElement(By.xpath())
    .click();
  driver.sleep(1000);
  const result = await driver.findElement(By.id("results"));
  const displayed = await result.isDisplayed();

  expect(displayed).toBe(true);
});
  */
