【網頁捲動導航列】
===

隨網頁上、下捲動，切換顯示目前所在頁面(數字編號)  

亦可點擊數字編號連結至該頁面  

Demo Page: https://leetnbo.github.io/scroll_navigator/

【使用方式】
===
1. html元素
   
   (1) **外容器**。預設為body,若body高度已設定為固定100%時，則須要再另行設定一個包覆全體元素且不能設定其高度為100%(vh)的容器類別名稱(className),如".main".
   
   (2) **導航列**，預設類別名稱為"Quick-navigation".
   
   (3) **導航區域**，預設類別名稱為"fullRegion".
   
   ![image](https://github.com/leetnbo/scroll_nav/assets/146815175/974ee791-d933-43c3-b6aa-5015271e420f)

   
2. 引入scrollNav.js ，呼叫scroll_navigator()並代入引數，例:
   
   ```js
   scroll_navigator({

        containerClassName: "main", //外容器
   
        regionClassName: "navRegion", //導航列
   
        navigatorClassName: "Quick-navigation", //導航區域
      
        throttleTime: 250, //觸發scroll,resize事件時的throttle延遲時間
   
    });
   ```   
   
3. CSS樣式設定參考

   * 導航列
   ```css
   .Quick-navigation {
     position: fixed;
     display: none;
     flex-direction: column;
     z-index: 10;
     right: 60px;
     top: 50%;
     transform: translateY(-50%);
     margin: auto;
   }
   .Quick-navigation a {
     width: 60px;
     height: 60px;
     display: flex;
     justify-content: center;
     align-items: center;
     font-size: 25px;
     cursor: pointer;
     color: #fff;
   }
   
   .Quick-navigation a.active {
     font-size: 35px;
     position: relative;
   }
   
   .Quick-navigation a.active::after {
     content: "";
     position: absolute;
     background-color: #fff;
     width: 100%;
     height: 1px;
     top: 50%;
     left: 100%;
   }
   ```
   
      
 
