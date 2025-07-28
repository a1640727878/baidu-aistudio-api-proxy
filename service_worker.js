// 后台服务脚本
console.log('【调试】服务工作线程已初始化，使用chrome.debugger API');

RulesID_1 = 1026;
RulesID_2 = 1027;

// 定义白名单URL数组
const whitelistUrls = [
  'https://aistudio.baidu.com/manifest.json'
];

// 监听标签页激活事件
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  updataRule(activeInfo.tabId, tab.url);
});

// 监听标签页URL更新事件
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    updataRule(tabId, changeInfo.url);
  }
});


function getUrlHead(tabUrl) {
  const tabUrlStarts = tabUrl.split('/api_serving/')[0] + '/api_serving/';
  const tabUrlEnd = tabUrl.replace(tabUrlStarts, '').split('/')[0];
  return tabUrlStarts + tabUrlEnd;
}

async function updataRule(tabId, tabUrl) {

  const isBaiduApi = tabUrl?.includes('//aistudio.baidu.com/') && tabUrl?.includes('/api_serving/');

  chrome.declarativeNetRequest.updateDynamicRules(
    {
      removeRuleIds: [RulesID_1, RulesID_2]
    }
  );

  if (!isBaiduApi) return;

  if (!tabUrl.endsWith('/')) tabUrl += '/';
  urlHead = getUrlHead(tabUrl)
  if (!urlHead.endsWith('/')) urlHead += '/';


  chrome.declarativeNetRequest.updateDynamicRules(
    {
      addRules: [
        {
          "id": RulesID_1,
          "priority": 10,
          "action": {
            "type": "allow"
          },
          "condition": {
            "regexFilter": "^(https?|ws)://aistudio\.baidu\.com/(.*)api_serving(.*)$",
            "isUrlFilterCaseSensitive": false,
            "resourceTypes": ["csp_report", "font", "image", "main_frame", "media", "object", "other", "ping", "script", "stylesheet", "sub_frame", "webbundle", "websocket", "webtransport", "xmlhttprequest"]
          }
        },
        {
          "id": RulesID_2,
          "priority": 5,
          "action": {
            "type": "redirect",
            "redirect": {
              "regexSubstitution": urlHead + '\\2'
            }
          },
          "condition": {
            "regexFilter": "^(https?|ws)://aistudio\\.baidu\\.com/(.*)$",
            "isUrlFilterCaseSensitive": false,
            "resourceTypes": ["csp_report", "font", "image", "main_frame", "media", "object", "other", "ping", "script", "stylesheet", "sub_frame", "webbundle", "websocket", "webtransport", "xmlhttprequest"]
          }
        }
      ]
    }
  );
}