describe('Basic user flow for Website', () => {
    // First, the website
    beforeAll(async () => {
      await page.goto('https://cse110-fa22-group21.github.io/cse110-fa22-group21/');
    });
  
    // Check to see that there are 0 tasks
    it('Initial Home Page - Check for 0 task names', async () => {
      console.log("In the home page now");
      const storage = await page.evaluate(() => {
        return window.localStorage.getItem('tasks')
      });
      expected = null;
      expect(storage).toBe(expected);
    });
  });