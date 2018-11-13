const FREE_USER_ROLE = 0;

const MAIN_KEY = '0';

const OAUTH_KEY = 'proton:oauth';

const MAILBOX_IDENTIFIERS = {
    inbox: '0',
    allDrafts: '1',
    allSent: '2',
    trash: '3',
    spam: '4',
    allmail: '5',
    starred: '10',
    archive: '6',
    sent: '7',
    drafts: '8',
    search: 'search',
    label: 'label'
};

const FREE_USER_ROLE = 0;

const ENCRYPTION_DEFAULT = 2048;

const CONTACT_EMAILS_LIMIT = 1000;

const INTERVAL_EVENT_TIMER = 30 * 1000; // time between querying the event log (every 30 seconds)  
const CONVERSATION_LIMIT = 100;
const ELEMENTS_PER_PAGE = 50;
const MESSAGE_VIEW_MODE = 1;
const MESSAGE_LIMIT = 100;
const CONVERSATION_REQUEST_SIZE = 10;  
const PLAINTEXT = 'text/plain';
const MAILBOX_PASSWORD_KEY = 'proton:mailbox_pwd';
const SAVE_TIMEOUT_TIME = 3000; // 3 seconds     
const KEY_VERSION = 3;
const DRAFT = 1;
const REPLY = 0;
const REPLY_ALL = 1;
const FORWARD = 2;
const STATUS = {
    DELETE: 0,
    CREATE: 1,
    UPDATE: 2,
    UPDATE_DRAFT: 2,
    UPDATE_FLAGS: 3
};
const SEND_TYPES = {
    SEND_PM: 1,
    SEND_EO: 2,
    SEND_CLEAR: 4,
    SEND_PGP_INLINE: 8,
    SEND_PGP_MIME: 16,
    SEND_MIME: 32
};

const ADDRESS_TYPE = {
    ORIGINAL: 1,
    ALIAS: 2,
    CUSTOM_DOMAIN: 3,
    PREMIUM: 4
};

const CANCEL_REQUEST = 'CANCEL_REQUEST';

const PAID_ADMIN_ROLE = 2;

const clientSecret = '4957cc9a2e0a2a49d02475c9d013478d';
const clientID = 'Web';

const UPLOAD_GRADIENT_DARK = '147, 145, 209'; // dark rgb color for upload progress bar                       
const UPLOAD_GRADIENT_LIGHT = '255, 255, 255'; // light rgb color for upload progress bar  