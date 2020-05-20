const menuItems = [
    {
        "id": "HomeMenu",
        "icon": "fas fa-home",
        "text": "Home",
    },
    {
        "id": "DashMenu",
        "icon": "fas fa-border-all",
        "text": "Dashboard",
    },
    {
        "id": "AnalyticsMenu",
        "icon": "fas fa-chart-line",
        "text": "Dashboard",
    }
]

var menuItemHtml = `<a href="javascript:void(0)" class="openbtn" onclick="openNav()"><i class="fas fa-caret-right"></i></a>
<a href="javascript:void(0)" class="closebtn" onclick="closeNav()"><i class="fas fa-caret-left"></i></a>`;

var sideMenu = document.getElementById("mySidenav")
for (var i = 0; i < Object.keys(menuItems).length; i++) {
    // Create the list item:
    menuItemHtml += `<span><a id="${menuItems[i]["id"]}" onclick="menuItemSelect(this)"><div class="div-hor"><i class="${menuItems[i]["icon"]}"></i><span class="nav-text"> ${menuItems[i]["text"]}</span></div></a></span>`
}
sideMenu.innerHTML = menuItemHtml

function menuItemSelect(elmnt) {
    var link = "../views/dashboard/dashboard.html"
    if (elmnt.id === "HomeMenu") link = "../views/home/home.html";
    if (elmnt.id === "DashMenu") link = "../views/dashboard/dashboard.html";
    if (elmnt.id === "AnalyticsMenu") link = "../views/analytics/analytics.html";

    $("#main").load(link); 
}

function openNav() {
    var index, len;
    var c = document.getElementsByClassName("nav-text");
    for (index = 0, len = c.length; index < len; ++index) {
        c[index].style.display="block";
    }

    document.getElementsByClassName("openbtn")[0].style.display="none";
    document.getElementsByClassName("closebtn")[0].style.display="block";

    document.getElementById("mySidenav").style.width = "150px";
    document.getElementById("main").style.marginLeft = "150px";
}
  
/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    var index, len;
    var c = document.getElementsByClassName("nav-text");     
    for (index = 0, len = c.length; index < len; ++index) {
        c[index].style.display="none";
    }

    document.getElementsByClassName("openbtn")[0].style.display="block";
    document.getElementsByClassName("closebtn")[0].style.display="none";

    document.getElementById("mySidenav").style.width = "45px";
    document.getElementById("main").style.marginLeft = "45px";
}