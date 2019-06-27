import { ObservablehqPage } from './app.po';

describe('observablehq App', () => {
  let page: ObservablehqPage;

  beforeEach(() => {
    page = new ObservablehqPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
