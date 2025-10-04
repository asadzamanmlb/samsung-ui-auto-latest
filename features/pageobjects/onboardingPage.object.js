import { browser } from '../hooks/hooks.js';

const onboardingPageObject = {
  'Get Started': async () =>  browser.$("//*[@data-testid='getStartedButton']"),
  'Have Mlb Account': async () =>  browser.$("//*[@data-testid='haveMlbAccountButton']"),
  'Email': async () =>  browser.$("//*[@data-testid='onboardingEmailInput']"),
  'Password': async () =>  browser.$("//*[@data-testid='onboardingPasswordInput']"),
  'Login': async () =>  browser.$("//*[@data-testid='onboardingLoginButton']"),
};

export default onboardingPageObject;
