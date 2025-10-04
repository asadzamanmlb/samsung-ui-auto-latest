import { browser } from "../../hooks/hooks.js";

const loginPageObject = {
  Email: async () => browser.$("//*[@data-testid='onboardingEmailInput']"),
  Password: async () =>
    browser.$("//*[@data-testid='onboardingPasswordInput']"),
  Login: async () => browser.$("//*[@data-testid='onboardingLoginButton']"),
  "Login Button": async () => browser.$("//*[@data-testid='loginButton']"),
  "Email Input": async () => browser.$("//*[@data-testid='emailInput']"),
  "Password Input": async () => browser.$("//*[@data-testid='passwordInput']"),
  "Forgot Password": async () =>
    browser.$("//*[@data-testid='forgotPasswordLink']"),
  "Sign Up": async () => browser.$("//*[@data-testid='signUpLink']"),
  "Remember Me": async () =>
    browser.$("//*[@data-testid='rememberMeCheckbox']"),
  login: async (email, password) => {
    const emailField = await browser.$(
      "//*[@data-testid='onboardingEmailInput']"
    );
    const passwordField = await browser.$(
      "//*[@data-testid='onboardingPasswordInput']"
    );
    const loginButton = await browser.$(
      "//*[@data-testid='onboardingLoginButton']"
    );

    await emailField.setValue(email);
    await passwordField.setValue(password);
    await loginButton.click();
  },
};

export default loginPageObject;

