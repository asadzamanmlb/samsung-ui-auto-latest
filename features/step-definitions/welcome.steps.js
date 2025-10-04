import { When } from '@wdio/cucumber-framework';
import globalObjectKeyFinder from '../commonFunctions/globalObjectKeyFinder.js';
import clickElementByTextOrXpathOrObjectKey from '../commonFunctions/clickElementByTextOrXpathOrObjectKey.js'
import loginPageObject from '../pageobjects/welcome/welcomePage.object.js';

/*global , */

When('I click on the get started button', async () => {
    let get_started_method;
    get_started_method = await (await globalObjectKeyFinder('get_started'))('Getting'); // using global   
    get_started_method = await loginPageObject.get_started('Getting'); // using without space since the key was without space, how demo of how to pass in params    
    clickElementByTextOrXpathOrObjectKey({objectKey: get_started_method}); // this function will click for PS5 and LG, it's basically a scroll to the item and click and then Enter key. 
});
