describe('Basic user flow for Website', () => {
    // First, the website
    beforeAll(async () => {
      // const browser = await puppeteer.launch();
      await page.goto('https://cse110-fa22-group21.github.io/cse110-fa22-group21/');
    });

    // Test 1 - Click start button, check that data.start has a value
    it('Initial Home Page - Team 1', async () => {
        const storage = await page.evaluate(() => {
          return window.localStorage.getItem('tasks')
        });
        expected = null;
        expect(storage).toBe(expected);
      });
});