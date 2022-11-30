describe('Basic user flow for Website', () => {
    // First, the website
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:5500/source/html/');
    });
  
    // Check to see that there are 0 tasks
    it('Initial Home Page - Check for 0 task names', async () => {
      console.log("In the home page now");
      const storage = await page.evaluate(() => {
        return window.localStorage.getItem('tasks')
      });
      expected = [];
      expect(storage).toBe(expected);
    });
  });