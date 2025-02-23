const express = require("express");
const app = express();

const PORT = process.env.PORT || 4600;
const axios = require("axios");
const path = require("path");

const { json } = require("stream/consumers");
const cors = require("cors");
const cheerio = require("cheerio")
const bodyparser = require("body-parser")
const { TextDecoder } = require('util');
const prettier = require("prettier");
const fs = require("fs");
require("dotenv").config();
const puppeteer = require('puppeteer-extra'); // Use puppeteer-extra
const StealthPlugin = require('puppeteer-extra-plugin-stealth'); // Import stealth plugin

puppeteer.use(StealthPlugin()); // Enable the stealth plugin


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin:"*",
  method:["GET","POST"]
}))
app.get("/",(req,resp)=>{
    console.log("entering in  to home page:::",req.get("User-Agent"))
 
      resp.sendFile(path.join(__dirname,"public","index.html"))
   
  
})
app.post("/data",async (req,resp)=>{
    console.log("entering into post method /data")
    let videolistobj = [];
    const value = req.body.user;
    console.log(value,"this is  serach value")
   let inf;
  let info
    try{
   
    const resu = await userinfo(value);
     info = resu.userInfo.user;
    videolistobj.push(info.secUid);
    videolistobj.push(info.uniqueId);
    const headers = resu.header.get("x-ms-token")
    videolistobj.push(headers)
    
    inf = {id:info.id,nickname:info.nickname,uniqueId:info.uniqueId,image:info.avatarLarger,bio:info.signature,secuid:info.secUid,region:info.region};
  
    } catch(error){
      resp.status("400").send("error")
      console.log(error)
    }

        
    
  
      resp.status("200").send(inf)
      
    })


// video list api 
app.post("/videos",async (req,resp)=>{
  console.log(req.body.user,"this is requrest form videos list api data");
  // Custom delay function using setTimeout
  const user = req.body.user;
   const data = await a(user);
   
   console.log(data,"this is video api data")

  resp.send(data)

})
// video list api ended/

//comment api
app.post("/comment",async (req,resp)=>{
  console.log("enteringinto comment api")
  const comments = req.body.vid;
 
  let arrayofcomments = []
  
  
  for(let i = 0;i<comments.length;i++){
  let id = comments[i].split("/").pop();
  

   
    await fetch(`https://www.tiktok.com/api/comment/list/?WebIdLastTime=1740193671&aid=1988&app_language=ja-JP&app_name=tiktok_web&aweme_id=${id}&browser_language=en-US&browser_name=Mozilla&browser_online=true&browser_platform=Win32&browser_version=5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F133.0.0.0%20Safari%2F537.36%20Edg%2F133.0.0.0&channel=tiktok_web&cookie_enabled=true&count=20&current_region=JP&cursor=0&data_collection_enabled=true&device_id=7474074858051405320&device_platform=web_pc&enter_from=tiktok_web&focus_state=true&fromWeb=1&from_page=video&history_len=8&is_fullscreen=false&is_non_personalized=false&is_page_visible=true&odinId=7468289446259377170&os=windows&priority_region=MM&referer=&region=MM&root_referer=https%3A%2F%2Fwww.bing.com%2F&screen_height=864&screen_width=1536&tz_name=Asia%2FRangoon&user_is_login=true&verifyFp=verify_m7fmiw56_RpRVXcG2_CdyW_4Efs_AndE_DYzNvg4Xngim&webcast_language=en&msToken=ct_1hCXyNREerz3-dGwNINCD6V1Ocm8X45YEF_zFtiR2zMjq-jc5awANvaimR6MhdBZO24lECg-rxwRXDur8_ll2Ll8_2courkTZLrNRHjHJaGs3xLpfAtbDCK7n4TjnzjaWI0nYHol-BxY-DIrkCmLK2g==&X-Bogus=DFSzswVu082ANr4ntD9hLeSscjc4&_signature=_02B4Z6wo00001FXIETgAAIDA35wf829AkUxVyBWAAHLS97`, {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Microsoft Edge\";v=\"133\", \"Chromium\";v=\"133\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0",
        "sec-fetch-site": "same-origin",
        "cookie": "tt_csrf_token=X8v1TdIr-NQV-FlU9d10IqJrBuKzO3gQgTYg; passport_csrf_token=4a09200b475a26002108e703608d29b0; passport_csrf_token_default=4a09200b475a26002108e703608d29b0; s_v_web_id=verify_m7fmiw56_RpRVXcG2_CdyW_4Efs_AndE_DYzNvg4Xngim; multi_sids=7468289446259377170%3A12272f9d8ae3734943cfa6e68bea8b56; cmpl_token=AgQQAPOwF-RO0reaXwlMJB0r_dimSEVKP4o7YNkVKA; uid_tt=051a0fdc385d69e2f1cd02ebb21e5f3592ca09ae8af75d6a1b6eb30880751245; uid_tt_ss=051a0fdc385d69e2f1cd02ebb21e5f3592ca09ae8af75d6a1b6eb30880751245; sid_tt=12272f9d8ae3734943cfa6e68bea8b56; sessionid=12272f9d8ae3734943cfa6e68bea8b56; sessionid_ss=12272f9d8ae3734943cfa6e68bea8b56; store-idc=alisg; store-country-code=mm; store-country-code-src=uid; tt-target-idc=alisg; tt-target-idc-sign=gcRDlcSZ0UrC4EBr3f-mU3gfEnzbk0YboQg2lcizJRaMwKKr539tGNf4NtB6uEAmRDjtwtUFEK6BAqpr838qo_mEExZblf1_DWWGul5UTehfpCx--2BwDJe-FaQMTYog0a1TJlTH41joF0OY74hYeBMK3U4z3iUvdbQoXCH3AOWx7L6yjn2SCX34UsGEg0MXnCQLNi_7W1l7JVi3bvG9_F8Gi-JUorR3CnYeBnap8JuAKXsxXsiuexO2npqYrG5rEaeeUCVHnjEcxgMPYgevbFqXbLmKn3R5rLvtu-89aWTtO7e3qismKILL9xE-LoJYaXDer206-yTV0njJLLLbQQNoHE6FmLIF1tR9FdrpLijBT_Y2OVmmTPAeIPajhJ5htTPdtkXeT5duFmbTMInGABnMiGeP_Fght47iQp5E37VS7JfOoady5_goJ7DfCvgHMwz5Y7K10brrahXGLsvNOfmCmmxKGurH-za7AhE9NAW40Hd0_c1_lx6t4OCQ3szc; last_login_method=QRcode; tt_chain_token=ZzlZbvPISbXfEwvvjIY6jw==; ak_bmsc=EB0B04DA948D4C709B72FDE10C8236C9~000000000000000000000000000000~YAAQLWW/yqGadxSVAQAA04igKxr6vT6Prt6yecFHzbkx2etXt2+wvXRd1SwdTJU32XvGgR0dklSOBrPPNu8rKz1qxfayPhVTBm+xWUWKQZ+g6pHN4fOaHaWZF7NcBXfuaWfHyqg9Dp8zjzDkKDQbpFEAjvnyKfylQ3e8/Isn0Eq318x0GmmdGBO54zFpVUiheVem6LbNhdcgUmgcvdOStuUpTzo8+yY6FE1oLZ8TYAT+4BJ9X0AeK67T0SG08Up7LcZJvfO67ZZ7KyqAjgxsFao3P63D5/zlZw3qLyHiJ98vXXY6u2ijcZCxDHS68XL8xtaDHA87RZe2Z0jWJGnOTOfUPXgFe96/gGJUNR3+KeeliYTNd+opx4nkYvFTRLTRj1Q8hucvBW2gPw==; tiktok_webapp_theme_source=auto; tiktok_webapp_theme=dark; delay_guest_mode_vid=5; odin_tt=fcd4b1a85a0086a89d061c6a6fd3589e21e5ccefe0e949513f688c7cd56531439db1571efdcb3018884206ca2fbac7c5dcab3f972f850c49cce9ef17c7c686d0d1840e791b55d3987cf6c7226a217e33; sid_guard=12272f9d8ae3734943cfa6e68bea8b56%7C1740193698%7C15551995%7CThu%2C+21-Aug-2025+03%3A08%3A13+GMT; sid_ucp_v1=1.0.0-KGQ4ZDI1NTcxNDliYWVhNGZhZjIwNzM2MjNiM2FlZmIyMmQ5N2M0MjUKGgiSiNug7LWs0mcQov_kvQYYsws4B0D0B0gEEAMaAm15IiAxMjI3MmY5ZDhhZTM3MzQ5NDNjZmE2ZTY4YmVhOGI1Ng; ssid_ucp_v1=1.0.0-KGQ4ZDI1NTcxNDliYWVhNGZhZjIwNzM2MjNiM2FlZmIyMmQ5N2M0MjUKGgiSiNug7LWs0mcQov_kvQYYsws4B0D0B0gEEAMaAm15IiAxMjI3MmY5ZDhhZTM3MzQ5NDNjZmE2ZTY4YmVhOGI1Ng; perf_feed_cache={%22expireTimestamp%22:1740366000000%2C%22itemIds%22:[%227469057338645761313%22%2C%227474061254181522695%22%2C%227462367842374126864%22]}; bm_sv=81A95046ADF7AEB81E30DC07B4630562~YAAQL/rSFzb6JySVAQAADoajKxpQbkJZkfflDx36z2h0e3WQ05K7oorsw+BWaFLoz1aHP7ux3vnoRvuisAh3ppm9E5sCy/9Qv9Xp5rxzISygaFHEPoi5fPKUCipqjfwSzrMr6uCoKYXZagArLeUcLD/Dc0a3OSYu1Ta/zgtHKcG+1CJKgBgDJjpjP6OUslZEj2E3WxqP2AVTpfjl4d4W7Y7AykeDnjfZ/6eB2qcZoLJllSVm84bjI8vx1JAoCBQI~1; passport_fe_beating_status=true; ttwid=1%7CyHm_dMDbfnN7wFICePzLzdupWYQNZcMDEBfGMk2UafU%7C1740193894%7C8b58802738af7d4927c03041578a2bab8cf529bb894ac46bc284dd406781e7d3; msToken=flPS4bvR1iRx5-ZtBgl4J6YfqxBx7nVaZ6Gy-owQz95Wx9QXzQsbHH_VDR8oaoA52haGDOURWm29xx1OicbyzjoDz9aw3bkXoQ0dv-bw8WGgsIXCNZCGKjbH9F8pBQ8iAwxqXQebu2mrlICZ1bkxOL0aPQ==; msToken=ct_1hCXyNREerz3-dGwNINCD6V1Ocm8X45YEF_zFtiR2zMjq-jc5awANvaimR6MhdBZO24lECg-rxwRXDur8_ll2Ll8_2courkTZLrNRHjHJaGs3xLpfAtbDCK7n4TjnzjaWI0nYHol-BxY-DIrkCmLK2g==",
        "Referer": "https://www.tiktok.com/@mkmkmarko/video/7469057338645761313",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
    }).then(async (d)=>{
      const jon = await d.json()
    
     await arrayofcomments.push(jon)
     
    })
    
  
   }

  resp.send(arrayofcomments)
})
//comment api ended




async function userinfo(value){
  let name = value;
 
  const resp =  await fetch(`https://www.tiktok.com/${name}`, {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "en-US,en;q=0.9",
    "priority": "u=0, i",
    "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Microsoft Edge\";v=\"133\", \"Chromium\";v=\"133\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "content-type":"text/html; charset=utf-8",
    "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0",
    "upgrade-insecure-requests": "1",
    "cookie": "tt_csrf_token=gnVux83R-oLDDBg_S60ElWr0zoK955Rri5mU; tt_chain_token=Bg1Hpxg53e0C8Ew70AXDKQ==; ak_bmsc=D746D257972D44AC500F83BBBB037CB3~000000000000000000000000000000~YAAQJmW/ykUgdgGVAQAAOUe8ERpbGNWT9fpLj58PgsKUrw7Rp78dFJdo9xnBM11RH5H3q3rhbIPja044N8VO4VBiVEQvLJKfKwmJTxd8kGRKjlCMzPx6zRRkeA72W9eCdKJaaBLpyqGbcFzoUp62KEKLFHib0Dzd4o/Ll0kfKeKTbZxkY1GJYKMuwW3KJf+hD4YPCLUEPfHdKM5/9fy31yoOXQ1beZJJFqMS8pp8fKcYBL2Sk5YQshTDjqhN5eY7fWTddNzGlXIUlhrtc1yeLSd4bvEOAJsoHQpyNXyZ9aEImiDlNVZqbRaJxzaEr1HHvJ7FcSykoHhNnR9LBxAwUUkyRsRKjnPaPMAfpvl+QdSltMUCsmdcpuzzMDd3Q6ACYpW9wY9t/4RF; tiktok_webapp_theme_source=auto; tiktok_webapp_theme=dark; s_v_web_id=verify_m78frspl_wtNQyaGe_3pAg_4V8c_8OJ6_uh9iacLcokWm; perf_feed_cache={%22expireTimestamp%22:1739930400000%2C%22itemIds%22:[%227469121089457638663%22%2C%227455328290060963090%22%2C%227470141625251941674%22]}; delay_guest_mode_vid=5; passport_csrf_token=95ca70925c1a8b1abed26282dc54ece8; passport_csrf_token_default=95ca70925c1a8b1abed26282dc54ece8; multi_sids=7468289446259377170%3Afd436fa498d8f7fd8d1189db69571f7b; cmpl_token=AgQQAPOwF-RO0reaXwlMJB0r_dMH8WIUv4o7YNnpYg; uid_tt=0b9414411f3c84c0eaeb0217c6ab155a281a35dedb14212f68843f1bccfb484b; uid_tt_ss=0b9414411f3c84c0eaeb0217c6ab155a281a35dedb14212f68843f1bccfb484b; sid_tt=fd436fa498d8f7fd8d1189db69571f7b; sessionid=fd436fa498d8f7fd8d1189db69571f7b; sessionid_ss=fd436fa498d8f7fd8d1189db69571f7b; store-idc=alisg; store-country-code=mm; store-country-code-src=uid; tt-target-idc=alisg; tt-target-idc-sign=H6CTeL7Rg04Eb4BjPUFPCtry-4xpV6s-kmORddpFKYPndeFsmSG_TjQrNZdghNrWr3IQlA3tbio8BGd1cYHVz_zify6Y4t8A8yDEyLeXESyv0sJ_G6hP69peLhxTpgEKyUTVaBPxf-26YtPFRaewZCsAsGVGPXA5lLhjmapAAavh789nmT1D42ftglHxU5zQ-XmzSXdgIAwT1K1c0_yYSLky4My_xwMQsdAJvIXaWNqC_K_M05I6wKfnj53IrioKVSR0l0GIA3DwR2OQorEJO6WcEs287MSkv0f2d67dAZxY84QBsul8r-XiKA0QiQ-jFi9nWgDtQqxe9O-wg1zsu7PwbtRcnOXtIfxckB6hImqVToShltltdg4WVKh0iYenoZ_2RVrkFCRPsDq3A2twPSeHEZgGynA9rD3QQ-YvR-e7BM_NfP9T_ELss4nONz9PHC6Qdf3qotv8VbT2qHOkz-hVdG3zHw9Vsn4FsIyMRnBP-5NCqNtp-ssRRD-Kc8MO; last_login_method=QRcode; ttwid=1%7CWXdVYYkXbaGOPVZ7mNiLpTUcZFvsftYYNvZyV-6tXwc%7C1739759420%7Cdf48390d1e458b851f7856e23190fa374e6c0e3f2dee5d5ab45e840370770d21; odin_tt=1f2d4ff1f3ae63e31cba854c2055ccacae2d0d4adf39046a3fb1a771969ba1b8aa4f28c7a95db6e1addf5a6a51261288a5d40ac46d3d3710066cee7d111d1e07; sid_guard=fd436fa498d8f7fd8d1189db69571f7b%7C1739759420%7C15551993%7CSat%2C+16-Aug-2025+02%3A30%3A13+GMT; sid_ucp_v1=1.0.0-KDFhZjUxZjk1NWY4OGJkNDkwZGNmOTgwNzliYzNiMWU4NzRhMzk0MDYKGgiSiNug7LWs0mcQvL7KvQYYsws4B0D0B0gEEAMaAm15IiBmZDQzNmZhNDk4ZDhmN2ZkOGQxMTg5ZGI2OTU3MWY3Yg; ssid_ucp_v1=1.0.0-KDFhZjUxZjk1NWY4OGJkNDkwZGNmOTgwNzliYzNiMWU4NzRhMzk0MDYKGgiSiNug7LWs0mcQvL7KvQYYsws4B0D0B0gEEAMaAm15IiBmZDQzNmZhNDk4ZDhmN2ZkOGQxMTg5ZGI2OTU3MWY3Yg; bm_sv=3C6DDABFCBC0732E49142E7E232D99F3~YAAQJmW/yl0gdgGVAQAADxi+ERqKE4HxIb7EU10rNQ4B7GbcXF2DAMg88GVxh3ujQWSXwJy0wQWd1JQZOpnHCN9U6RmzmBlCW9bYu2np7H2Xwu5kOAhTiAb0tsgqhKW+/zbD50IAWuvaj+XUcYHgRs4kRmE6Dg//1Nssxd2REUHLy+DAf7BcxNlofgI3HxcaNqDRnRPtCAPvzKIQWI7mb9qAyG6XFA2VwzGO6n/ygG1LsV7yTGQ7TR+3MqxVmkHq~1; msToken=tu7RtCC1HPBg4KJdIH6-wnGZJOUuPWW-n8KhaKdTKhUSzQxBCChYD5GpFOeWrZlVTo0VUevI8slu1fJF6k76f_ytAKUaW-OYmsbv8X38mV2rlanMxK_AIif27dK8KuhAoWueNMsMmx8amor6KFH-twQdxTE=; msToken=HmiEXpe25d7yWB4CZuRgsH21nywK5J6sFremcRpL_tMTFOi5GKQCSOg12BDh9IbJ8eVbxdqL7ZDGxIbz7Pmvo6d2SoHOTNfyAyUnoR4GBrJAhM3IRsPGoBP6Jt6sXh4keoud3yDmu-X86r6zk-MjtTSa7P8=; passport_fe_beating_status=false"
  },
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET"
})
 
 const header = resp.headers;

  const d =await resp.text()
  const $ =  cheerio.load(d);
   const script = $("#__UNIVERSAL_DATA_FOR_REHYDRATION__");
   
   if (script.length) {
    const scriptContent = script.text();  // Extract the HTML content inside the script tag
    const result =  JSON.parse(scriptContent);
    const userInfo = result.__DEFAULT_SCOPE__['webapp.user-detail'].userInfo;
    const user = result.__DEFAULT_SCOPE__['webapp.app-context'].user;
    
   
   return {userInfo,header}
  
  } else {
    console.log('Script tag with id "__UNIVERSAL_DATA_FOR_REHYDRATION__" not found.');
  }
 
 
  }
  
 

 //chrome extentionis for videos
 function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function start() {
  const browser = await puppeteer.launch({
    headless: true, // Keep it headless for speed
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const p = await browser.newPage();

  // Block unnecessary resources like images and stylesheets to speed things up
  await p.setRequestInterception(true);
  p.on('request', (request) => {
    if (['image', 'font', 'stylesheet'].includes(request.resourceType())) {
      request.abort();  // Block media-heavy content (like images and fonts)
    } else {
      request.continue();
    }
  });

  return { browser, p };
}

async function a(user) {
  let images = [], vid = [];
  let browser, p;

  try {
    // Launch Puppeteer and get page object
    ({ browser, p } = await start());

    // Set viewport size (optional, but useful for mobile views)
    await p.setViewport({ width: 1000, height: 500 });

    // Launch URL and wait until the page content is loaded
    await p.goto(`https://www.tiktok.com/${user}`, { waitUntil: 'networkidle2', timeout: 60000 });

    // Check if the browser is still connected
    if (browser.isConnected()) {
      console.log('Browser is open and running');
    } else {
      console.log('Browser is closed');
    }

    // Wait for the class containing images and links to be available
    await p.waitForSelector('.css-1qb12g8-DivThreeColumnContainer.eegew6e2', { visible: true, timeout: 200000 });

    // Scroll the page to load content if required
    for (let i = 0; i < 3; i++) {
      await p.evaluate(() => window.scrollBy(0, 1000)); // Scroll down by one viewport height
      await p.waitForTimeout(3000); // Wait for 3 seconds after scroll to let the content load
    }

    // Extract the images and video links from the class
    const elements = await p.$('.css-1qb12g8-DivThreeColumnContainer.eegew6e2');

    for (let element of elements) {
      // Extract <img> tags (image URLs)
      const imgLinks = await element.$$eval('img', imgs => {
        return imgs.map(img => ({
          src: img.src,  // Image source
          alt: img.alt   // Image alt text
        }));
      });

      // Extract <a> tags (video URLs)
      const videoLinks = await element.$$eval('a', links => {
        return links.map(a => a.href);
      });

      // Add the extracted data to arrays
      images.push(...imgLinks);
      vid.push(...videoLinks);
    }

    console.log("Images:", images);
    console.log("Video Links:", vid);

    await browser.close();
  } catch (err) {
    console.error("Error:", err);
  }

  return { images, vid };
}

 // chrome extentions ended

// comment function
/*async function a(){
  for(let i = 0;i<comments.length;i++){
  let videoID = comments[0].split("/").pop();
     await comment(videoID)
  
   }
}*/



// comment function ended
app.use(express.static(path.join(__dirname,"public")))
app.listen(PORT,'0.0.0.0',()=>{
    console.log(`server is running on port = ${PORT}`)
})



