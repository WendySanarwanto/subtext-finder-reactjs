import {test, expect} from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const TARGET_APP_URL = process.env.TARGET_URL || 'http://localhost:3000';

test.describe('Find subtext from entered Text', () => {
    test.beforeEach(async ({ page }) => {
        // Go to application
        // console.log('TARGET_APP_URL: '+TARGET_APP_URL);
        await page.goto(TARGET_APP_URL);
    });

    const doProcess = async (text, subtext, expectedIndexes, expectedHighlightedText, page) => {
        await page.fill('#textInput', text);
        await page.fill('#subtextInput', subtext);
        await page.click('#btnProcess');

        await page.locator('#indexes').waitFor();

        const actual = await page.locator('#indexes').innerText();
        expect(actual).toBe(expectedIndexes);

        const actualHighlightedText = await page.locator('#highlightedText').innerHTML();
        expect(actualHighlightedText).toBe(expectedHighlightedText);       
    };

    test('Find2SubtextWithinASentenceTest', async ({page}) => {
        const text = "Hello Wendy Sanarwanto. How are you today, Wendy ?";
        const subtext = "Wendy";
        const expected = "7 and 44";
        const expectedHighlightedText = "Hello <u>Wendy</u> Sanarwanto. How are you today, <u>Wendy</u> ?";

        await doProcess(text, subtext, expected, expectedHighlightedText, page);
    });

    test('FindSubtextWithinLengthyWordTest', async ({page}) => {
        const text = "HelloWendySanarwanto.Howareyoutoday,Wendy?";
        const subtext = "Wendy";
        const expected = "6 and 37";
        const expectedHighlightedText = "Hello<u>Wendy</u>Sanarwanto.Howareyoutoday,<u>Wendy</u>?";

        await doProcess(text, subtext, expected, expectedHighlightedText, page);             
    });

    test('FindPartialCharsWithinASentenceIgnoreCasingTest', async ({page}) => {
        const text = "Beauty and beast";
        const subtext = "Ea";
        const expected = "2 and 13";
        const expectedHighlightedText = "B<u>Ea</u>uty and b<u>Ea</u>st";

        await doProcess(text, subtext, expected, expectedHighlightedText, page);       
    });

    test('FindSpacesWithinASentenceTest', async ({page}) => {
        const text = "Beauty and beast";
        const subtext = " ";
        await page.fill('#textInput', text);
        await page.fill('#subtextInput', subtext);
        await page.click('#btnProcess');        

        const actual = await page.locator('#validationError').isVisible();
        expect(actual).toBeTruthy();
    });

    test('FindAnumberInMixedNumericAndNonAlphanumbericStringTest', async ({page})=>{
        const text = "124523786^&$%&%#987230123";
        const subtext = "1";
        const expected = "1 and 23";
        const expectedHighlightedText = "<u>1</u>24523786^&amp;$%&amp;%#987230<u>1</u>23";

        await doProcess(text, subtext, expected, expectedHighlightedText, page);
    });

    test('FindDotOnDotsSpacesTest', async ({page})=>{
        const text = ". . . ";
        const subtext = ".";
        const expected = "1, 3 and 5";
        const expectedHighlightedText = "<u>.</u> <u>.</u> <u>.</u> ";

        await doProcess(text, subtext, expected, expectedHighlightedText, page);
    });

    test('FindDoubleQuotesTest', async ({page}) => {
        const text = "ignore\"eeyore\"bored";
        const subtext = "e\"";
        const expected = "6 and 13";
        const expectedHighlightedText = 'ignor<u>e"</u>eeyor<u>e"</u>bored';

        await doProcess(text, subtext, expected, expectedHighlightedText, page);
    });

    test('FindSlashDotsTest', async ({page})=>{
        const text = '//.\\\\.//.\\\\';
        const subtext = '/.';
        const expected = "2 and 8";
        const expectedHighlightedText = '/<u>/.</u>\\\\./<u>/.</u>\\\\';

        await doProcess(text, subtext, expected, expectedHighlightedText, page);
    });

    test('FindDotBackslashTest', async ({page})=>{
        const text = '//.\\\\.//.\\\\';
        const subtext = '.\\';
        const expected = "3 and 9";
        const expectedHighlightedText = '//<u>.\\</u>\\.//<u>.\\</u>\\';

        await doProcess(text, subtext, expected, expectedHighlightedText, page);
    });

    test('FindQustionCharTest', async ({page}) => {
        const text = 'How are you today ?';
        const subtext = '?';
        const expected = "19";
        const expectedHighlightedText = 'How are you today <u>?</u>';

        await doProcess(text, subtext, expected, expectedHighlightedText, page);
    });

    test('FindAwaCharsTest', async ({page}) => {
        const text = 'awawawawawawa';
        const subtext = 'awa';
        const expectedIndexes = '1, 3, 5, 7, 9 and 11';
        const expectedHighlightedText = '<u>awa</u><u>w</u><u>a</u><u>w</u><u>a</u><u>w</u><u>a</u><u>w</u><u>a</u><u>w</u><u>a</u>';

        await doProcess(text, subtext, expectedIndexes,expectedHighlightedText, page);
    });
});
