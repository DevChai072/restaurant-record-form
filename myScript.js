/**
 * function for get api {Restaurant}
 * dev Somchai O00085
 * @param {*} url 
 */
function getApiRestaurant(url) {
    // for as assign data
    var dbMaster;

    $.ajax({
        method: "get",
        url: "https://gdev.geotalent.co.th/Training/api/" + url,
        async: false,
        success: function(data) {
            dbMaster = data.result;
        },
        error: function(errMsg) {
            // console.log(errMsg)
        }
    });

    return dbMaster;
}

/**
 * function for add new api {Restaurant}
 * dev Somchai O00085
 * @param {*} url
 * @param {*} jsonData
 */
function sendDataToApi(url, jsonData) {
    $.ajax({
        method: "POST",
        url: "https://gdev.geotalent.co.th/Training/api/" + url,
        contentType: "application/json",
        data: JSON.stringify(jsonData),
        async: false,
        success: function(response) {
            // console.log(response.result.success);
        },
        error: function(errMsg) {
            // console.log(errMsg)
        }
    });
}

/**
 * function for create data on select type 
 * dev Somchai O00085
 */
function createDataSelectType() {
    // get data from api
    var restaurantType = getApiRestaurant("restauranttype/all");

    // tag {selectTypeRestaurant}
    var selectModel = $("#selectTypeRestaurant");
    var optionModel = selectModel.prop('options');
    optionModel[optionModel.length] = new Option("All", "all");

    // tag {selectInputTypeFood}
    var selectInputModel = $("#selectInputTypeFood");
    var selectInputModel = selectInputModel.prop('options');

    // put data to option
    $.each(restaurantType, function(index, value) {
        optionModel[optionModel.length] = new Option(value.name, value.id);
        selectInputModel[selectInputModel.length] = new Option(value.name, value.id);
    });

    // get data from api {food type}
    var foodCategory = getApiRestaurant("foodcategory/all");

    // tag {selectFoodType}
    var selectModelViewMenu = $("#selectFoodType");
    var optionModelViewMenu = selectModelViewMenu.prop('options');
    optionModelViewMenu[optionModelViewMenu.length] = new Option("All", "all");

    // tag {selectInputFoodType}
    var selectInputModelMenu = $("#selectInputFoodType");
    var selectInputModelMenu = selectInputModelMenu.prop('options');

    // put data to option
    $.each(foodCategory, function(index, value) {
        optionModelViewMenu[optionModelViewMenu.length] = new Option(value.categoryName, value.categoryId);
        selectInputModelMenu[selectInputModelMenu.length] = new Option(value.categoryName, value.categoryId);
    });
}

/**
 * function for display all data in table jquery
 * dev Somchai O00085
 */
function tableJquery() {
    // for focus tag select in option
    var restaurantTypeId = $("#selectTypeRestaurant").val();

    // create data on table
    createDataOnTableJuery(restaurantTypeId);

    $("#selectTypeRestaurant").change(function() {
        // reset all data on table
        resetTableJquery();

        // get value from element select
        var selectRestaurantTypeId = $(this).find(":selected").val();

        // create data on table
        createDataOnTableJuery(selectRestaurantTypeId);
    });
}

/**
 * function for create data on table {tableJquery}
 * dev Somchai O00085
 * @param {*} selectRestaurantTypeId 
 */
function createDataOnTableJuery(selectRestaurantTypeId) {

    // get data from api
    var restaurant = getApiRestaurant("restaurant/all");

    // reset row data in table
    resetTableJquery();

    // $.each(restaurant, function(index, val) {
    //     // variable on table {tableJquery}
    //     var restaurantId = val.restaurantId;
    //     var restaurantName = val.restaurantName;
    //     var restaurantTypeId = val.restaurantTypeId;
    //     var restaurantTypeName = val.restaurantTypeName;

    //     var syntaxRows = "<tr>";
    //     // field {Name}
    //     syntaxRows += "<td>" + restaurantName + "</td>";
    //     // field {Type}
    //     syntaxRows += "<td>" + restaurantTypeName + "</td>";
    //     // field button {view menu}
    //     syntaxRows += "<td><button class='btnAct' id='btnVm-"+ index +"' onclick='viewMenuToRows("+ restaurantId +")'>View Menu</button></td>";
    //     // field button {edit}
    //     syntaxRows += "<td><button class='btnAct' id='btnEdit-"+ index +"' onclick='editToRows("+ restaurantId +")'>Edit</button></td>";
    //     // field button {delete}
    //     syntaxRows += "<td><button class='btnAct' id='btnDel-"+ index +"' onclick='deleteToRows("+ restaurantId +")'>Delete</button></td>";
    //     syntaxRows += "</tr>";

    //     var isAddRow = (selectRestaurantTypeId === "all") || (selectRestaurantTypeId == restaurantTypeId); // return true or false
    //     if (isAddRow) {
    //         $("#tableJquery tr:last").after(syntaxRows);
    //         setCss(); // set css for element in table
    //     }
    // });

    var tableName = "#tableJquery";

    $.each(restaurant, function(index, val) {
        // variable on table {tableJquery}
        var restaurantId = val.restaurantId;
        var restaurantName = val.restaurantName;
        var restaurantTypeId = val.restaurantTypeId;
        var restaurantTypeName = val.restaurantTypeName;

        var syntaxRows = "<tr><td></td><td></td><td></td><td></td><td></td></tr>";

        var isAddRow = (selectRestaurantTypeId === "all") || (selectRestaurantTypeId == restaurantTypeId); // return true or false
        if (isAddRow) {
            $(tableName + " tr:last").after(syntaxRows);

            var rowId = index;
            rowId++;

            $(tableName + " tr:eq("+ rowId +")").find("td:eq(0)").text(restaurantName);
            $(tableName + " tr:eq("+ rowId +")").find("td:eq(1)").text(restaurantTypeName);
            $(tableName + " tr:eq("+ rowId +")").find("td:eq(2)").append("<button class='btnAct' id='btnVm-"+ index +"' onclick='viewMenuToRows("+ restaurantId +")'>View Menu</button>");
            $(tableName + " tr:eq("+ rowId +")").find("td:eq(3)").append("<button class='btnAct' id='btnEdit-"+ index +"' onclick='editToRows("+ restaurantId +")'>Edit</button>");
            $(tableName + " tr:eq("+ rowId +")").find("td:eq(4)").append("<button class='btnAct' id='btnDel-"+ index +"' onclick='deleteToRows("+ restaurantId +")'>Delete</button>");

            setCss(); // set css for element in table
        }
    });

    // display not found data on table
    notFoundDataInTable();

}

/**
 * function for reset form before add neww restaurant
 * dev Somchai O00085
 */
function btnAddNewForm() {
    $("#btnAddNewRestaurant").click(function() {
        clearValueFormInput();
    });

    $("#btnAddNewMenu").click(function() {
        clearValueFormInput();
    });
}

/**
 * function for event click to {save} and {edit}
 * dev Somchai O00085
 */
function saveData() {
    // for keep status button
    var attrButton;

    // button save
    $("#btnSave").click(function() {
        // get data from attr button save
        attrButton = $(this).attr("data-status");

        // for focus tag select in option
        $("#selectTypeRestaurant option[value='all']").attr("selected", "selected");

        // get data from prepare {formData}
        prepareDataInForm();
        
        // validat form input
        var isValidForm = formData.txtInputRestaurantName.length > 0;

        if (isValidForm) {
            if (attrButton === "save") {
                var confirmAlert = confirm("ต้องการบันทึกข้อมูลหรือไม่");
                if (confirmAlert == true) {

                    // prepare data
                    var jsonData = {
                        "name": formData.txtInputRestaurantName,
                        "type": formData.selectInputTypeFood,
                        "detail": formData.txtInputDetail
                    }
                    // send data to api
                    sendDataToApi("restaurant/create", jsonData);
                    
                    // create data on table
                    createDataOnTableJuery("all");

                    // clear data in form input
                    clearValueFormInput();

                    alert("บันทึกข้อมูลเรียบร้อย");
                }
            }
            else if (attrButton === "edit") {
                var confirmAlert = confirm("ต้องการแก้ไขข้อมูลหรือไม่");
                if (confirmAlert == true) {

                    // prepare data
                    var jsonData = {
                        "id": formData.findIdEdit,
                        "name": formData.txtInputRestaurantName,
                        "type": formData.selectInputTypeFood,
                        "detail": formData.txtInputDetail
                    }
                    // send parameter {url} and {json data}
                    sendDataToApi("restaurant/update", jsonData);

                    // create data on table
                    createDataOnTableJuery("all");

                    // clear data in form input
                    clearValueFormInput();

                    alert("แก้ไขข้อมูลเรียบร้อย");
                }
            }
        } else {
            alert("กรุณากรอกข้อมูลให้ครบ");
        }
    });

    $("#btnSaveMenu").click(function() {
        // get data from attr button save
        attrButton = $(this).attr("data-status");

        // for focus tag select in option
        $("#selectFoodType option[value='all']").attr("selected", "selected");

        // get data from prepare {formDataMenu}
        prepareDataInFormMenu();

        // validat form input
        var isValidForm = ((formDataMenu.txtInputFoodName !== "") && (formDataMenu.txtInputFoodName.length <= 200)) && (formDataMenu.txtInputFoodPrice !== "");
        if (isValidForm) {
            // check data attribute is save or edit
            if (attrButton === "saveMenu") {
                var confirmAlert = confirm("ต้องการบันทึกข้อมูลหรือไม่");
                if (confirmAlert == true) {

                    // prepare data menu
                    var jsonData = {
                        "name": formDataMenu.txtInputFoodName,
                        "price": formDataMenu.txtInputFoodPrice,
                        "categoryId": formDataMenu.selectInputFoodType,
                        "restaurantId": formDataMenu.txtInputRestaurantId
                    }
                    
                    // send data to api for create new menu
                    sendDataToApi("food/create", jsonData);

                    // create data on table {tableViewMenu}
                    createDataOnTableViewMenu(jsonData.restaurantId, "all");

                    // clear data in form input
                    clearValueFormInput();

                    alert("บันทึกข้อมูลเรียบร้อย");
                }
            }
            else if (attrButton === "editMenu") {
                var confirmAlert = confirm("ต้องการแก้ไขข้อมูลหรือไม่");
                if (confirmAlert == true) {

                    // prepare data menu
                    var jsonData = {
                        "id": formDataMenu.foodIdEdit,
                        "name": formDataMenu.txtInputFoodName,
                        "price": formDataMenu.txtInputFoodPrice,
                        "categoryId": formDataMenu.selectInputFoodType,
                        "restaurantId": formDataMenu.txtInputRestaurantId
                    }
                    // send parameter {url} and {json data}
                    sendDataToApi("food/update", jsonData);

                    // create data on table {tableViewMenu}
                    createDataOnTableViewMenu(jsonData.restaurantId, "all");

                    // clear data in form input
                    clearValueFormInput();

                    alert("แก้ไขข้อมูลเรียบร้อย");
                }
            }
        } else {
            alert("กรุณากรอกข้อมูลให้ครบ");
        }
    });
}

/**
 * function for edit data row in table
 * dev Somchai O00085
 * @param {*} findIndex 
 */
function editToRows(findIndex) {
    // set attribute data = {edit} in button save
    $("#btnSave").attr("data-status", "edit"); 

    // search data in array {dataTblRestaurant}
    var dataRestaurantForEdit = getApiRestaurant("restaurant/"+ findIndex);
    if (dataRestaurantForEdit) {
        // put data to form input
        $("#txtInputIdHidden").val(dataRestaurantForEdit[0].restaurantId);
        $("#txtInputRestaurantName").val(dataRestaurantForEdit[0].restaurantName);
        $("#selectInputTypeFood").val(dataRestaurantForEdit[0].restaurantTypeId);
        $("#txtInputDetail").val(dataRestaurantForEdit[0].detail);
    }
}

/**
 * function for delete data in api {Restaurant}
 * dev Somchai O00085
 * @param {*} id
 */
function deleteToRows(id) {
    // get result data from api by {id}
    var resultData = getApiRestaurant("restaurant/"+ id);
    var isValidId = resultData[0].restaurantId != 0;

    if (isValidId) {
        // get value selected from select type restaurant
        var selectTypeRestaurantId = $("#selectTypeRestaurant").find("option:selected").val();

        var confirmAlert = confirm("ต้องการลบข้อมูลหรือไม่");
        if (confirmAlert == true) {
            // prepare data to json
            var jsonData = { id: resultData[0].restaurantId };
            // send data to api
            sendDataToApi("restaurant/delete", jsonData);

            // for focus tag select in option
            $("#selectTypeRestaurant option[value='"+ selectTypeRestaurantId +"']").attr("selected", "selected");

            // create data on table
            createDataOnTableJuery(selectTypeRestaurantId);

            // close all element of view Menu {after remove item}
            $("div.formViewMenu").hide();

            // clear data in form input
            clearValueFormInput();

            alert("ลบข้อมูลเรียบร้อย");
        }
    }
}

/**
 * function for cancel form input
 * dev Somchai O00085
 */
function cancelData() {
    $("#btnCancel").click(function() {
        clearValueFormInput();
    });

    $("#btnCancelMenu").click(function() {
        clearValueFormInput();
    });
}

/**
 * function for reser rows intable
 * dev Somchai O00085
 */
function resetTableJquery() {
    $("#tableJquery").find("tr:gt(0)").remove();
}

/**
 * function for display word Not Found in table
 * dev Somchai O00085
 */
function notFoundDataInTable() {
    var rowCount = $("#tableJquery td").closest("tr").length;
    if (rowCount == 0) {
        var syntaxRows = "<tr><td colspan='5'>Not Found !</td></tr>";
        $("#tableJquery tr:last").after(syntaxRows);
        $("#tableJquery tr td:last").css({"text-align": "center"});
    }
}

/**
 * function for set css
 * dev Somchai O00085
 */
function setCss() {
    $("button.btnAct").parent().css({"text-align": "center"});
    $("button.btnActVm").parent().css({"text-align": "center"});
    $("table#tableJquery tr:nth-child(2n+0)").css({"background-color": "#ddd"});
    $("table#tableViewMenu tr:nth-child(2n+0)").css({"background-color": "#ddd"});
}

/**
 * function for preparing data in pre-action format {prepareDataInForm}
 * dev Somchai O00085
 */
function prepareDataInForm() {
    var findIdEdit = $("#txtInputIdHidden").val();
    var txtInputRestaurantName = $("#txtInputRestaurantName").val();
    var selectInputTypeFood = $("#selectInputTypeFood").val();
    var selectInputTypeFoodText = $("#selectInputTypeFood").find("option:selected").text();
    var txtInputDetail = $("#txtInputDetail").val();
    return formData = {
        "findIdEdit" : findIdEdit,
        "txtInputRestaurantName" : txtInputRestaurantName,
        "selectInputTypeFood" : selectInputTypeFood,
        "selectInputTypeFoodText" : selectInputTypeFoodText,
        "txtInputDetail" : txtInputDetail
    }
}

/**
 * function for clear value in form input
 * dev Somchai O00085
 */
function clearValueFormInput() {
    $("#btnSave").attr("data-status", "save");
    $("#txtInputRestaurantName").val("");
    $("#txtInputRestaurantName").focus();
    $("#selectInputTypeFood").prop("selectedIndex", 0);
    $("#txtInputDetail").val("");

    $("#btnSaveMenu").attr("data-status", "saveMenu");
    $("#txtInputFoodName").val("");
    $("#txtInputFoodName").focus();
    $("#selectInputFoodType").prop("selectedIndex", 0);
    $("#txtInputFoodPrice").val("");
}

/**
 * ===================================================================================
 * Form Hidden of view menu
 * ===================================================================================
 */

 /**
  * function for when click to view menu then show menu
  * dev Somchai O00085
  * @param {*} restaurantId 
  */
function viewMenuToRows(restaurantId) {
    // create css for view menu
    createCssViewMenu();

    // put value in form input hidden
    $("#txtInputRestaurantIdHidden").val(restaurantId);

    // display data on table {tableViewMenu}
    tableViewMenu(restaurantId);
}

/**
 * function for display all data in table view menu
 * dev Somchai O00085
 * @param {*} resultRestaurantById
 */
function tableViewMenu(restaurantId) {
    // get value from element select
    var selectFoodTypeId = $("#selectFoodType").find("option:selected").val();

    // create data on table {table ViewMenu}
    createDataOnTableViewMenu(restaurantId, selectFoodTypeId);

    $("#selectFoodType").change(function() {
        // reset all data on table
        resetTableViewMenu();

        // get value from element select
        var selectFoodTypeId = $(this).find("option:selected").val();

        // create data on table {table ViewMenu}
        createDataOnTableViewMenu(restaurantId, selectFoodTypeId);

        // display not found data on table
        notFoundDataInTableMenu();
    });
}

/**
 * function for create data on table {tableViewMenu}
 * dev Somchai O00085
 * @param {*} restaurantId
 * @param {*} selectFoodTypeId
 */
function createDataOnTableViewMenu(restaurantId, selectFoodTypeId) {
    // reset all data on table
    resetTableViewMenu();

    // get data api from Restaurant by id
    var resultRestaurantById = getDataRestaurantById(restaurantId);
    
    // put text to tag title Restaurant name menu <h3>
    $("h3#titleNameRestaurant").text(resultRestaurantById.restaurantName);

    if (resultRestaurantById.food !== null) { // has data in resultRestaurantById >> food

        var tableName = "#tableViewMenu";

        $.each(resultRestaurantById.food, function(index, val) {
            var foodData = searchFood(val); // get food data 

            var syntaxRows = "<tr><td></td><td></td><td></td><td></td><td></td></tr>";

            var isAddRow = (selectFoodTypeId === "all") || (selectFoodTypeId == foodData.categoryId);
            if (isAddRow) {
                $("#tableViewMenu tr:last").after(syntaxRows);

                var rowId = index;
                rowId++;

                $(tableName + " tr:eq("+ rowId +")").find("td:eq(0)").text(foodData.foodName);
                $(tableName + " tr:eq("+ rowId +")").find("td:eq(1)").text(foodData.categoryName);
                $(tableName + " tr:eq("+ rowId +")").find("td:eq(2)").text(foodData.price);
                $(tableName + " tr:eq("+ rowId +")").find("td:eq(3)").append("<button class='btnActVm' id='btnEditVm-"+ index +"' onclick='editVmToRows("+ foodData.foodId +", "+ resultRestaurantById.restaurantId +")'>Edit</button>");
                $(tableName + " tr:eq("+ rowId +")").find("td:eq(4)").append("<button class='btnActVm' id='btnDelVm-"+ index +"' onclick='deleteVmToRows("+ foodData.foodId +", "+ resultRestaurantById.restaurantId +")'>Delete</button>");

                setCss();
            }
        });

    } else {
        // display not found data on table
        notFoundDataInTableMenu();
    }
}

/**
 * function for edit data row in table
 * dev Somchai O00085
 * @param {*} foodId 
 */
function editVmToRows(foodId, restaurantId) {
    // set attribute data = {edit} in button save
    $("#btnSaveMenu").attr("data-status", "editMenu");

    // search data in api {food}
    var resultDataFood = searchFood(foodId);
    if (resultDataFood) {
        $("#txtInputFoodIdHidden").val(resultDataFood.foodId);
        $("#txtInputRestaurantIdHidden").val(restaurantId);
        $("#txtInputFoodName").val(resultDataFood.foodName);
        $("#selectInputFoodType").val(resultDataFood.categoryId);
        $("#txtInputFoodPrice").val(resultDataFood.price);
    }
    
}

/**
 * function for delete data row in table
 * dev Somchai O00085
 * @param {*} foodId
 * @param {*} restaurantId
 */
function deleteVmToRows(foodId, restaurantId) {
    var confirmAlert = confirm("ต้องการลบข้อมูลหรือไม่");
    if (confirmAlert == true) {
        // prepare data to json
        var jsonData = { id: foodId };
        // send data to api
        sendDataToApi("food/delete", jsonData);

        // get value from element select
        var selectFoodTypeId = $("#selectFoodType").find("option:selected").val();

        // create data on table
        createDataOnTableViewMenu(restaurantId, selectFoodTypeId);

        // clear data in form input
        clearValueFormInput();

        alert("ลบข้อมูลเรียบร้อย");
    }
}

/**
 * function for search item in array {food/all}
 * dev Somchai O00085
 * @param {*} foodId 
 */
function searchFood(foodId) {
    var resultDataFood;
    var arrayDataFood = getApiRestaurant("food/all");
    var arrayDataFoodId = arrayDataFood.foodId;
    return arrayDataFood.find(item => item.foodId == foodId);
}

/**
 * function for get data from api {restaurant} by id
 * dev Somchai O00085
 * @param {*} restaurantId 
 */
function getDataRestaurantById(restaurantId) {
    var result = getApiRestaurant("restaurant/"+ restaurantId);
    return result[0];
}

/**
 * function for create css in view menu
 * dev Somchai O00085
 */
function createCssViewMenu() {
    // display form view menu
    $(".formViewMenu").show();
    $(".formViewMenu").css({"padding-top": "5px"});

    // set style tag <hr>
    $(".hrDotted").css({"border-top": "5px dotted black"});

    // set style table view menu
    $("table#tableViewMenu").css({
        "display": "table",
        "border-collapse": "collapse",
        "border-spacing": "0",
        "width": "100%"
    });
    $("table#tableViewMenu tr th td").css({"border": "1px solid rgb(190, 190, 190)"});
    $("table#tableViewMenu th").css({
        "background-color": "#11167a",
        "color": "#ffffff",
        "padding": "15px"
    });
}

/**
 * function for reser rows intable
 * dev Somchai O00085
 */
function resetTableViewMenu() {
    $("#tableViewMenu").find("tr:gt(0)").remove();
}

/**
 * function for display word Not Found in table
 * dev Somchai O00085
 */
function notFoundDataInTableMenu() {
    var rowCount = $("#tableViewMenu td").closest("tr").length;
    if (rowCount == 0) {
        var syntaxRows = "<tr><td colspan='5'>Not Found !</td></tr>";
        $("#tableViewMenu tr:last").after(syntaxRows);
        $("#tableViewMenu tr td:last").css({"text-align": "center"});
    }
}

/**
 * function for preparing data in pre-action format {prepareDataInFormMenu}
 * dev Somchai O00085
 */
function prepareDataInFormMenu() {
    var foodIdEdit = $("#txtInputFoodIdHidden").val();
    var txtInputRestaurantId = $("#txtInputRestaurantIdHidden").val();
    var txtInputFoodName = $("#txtInputFoodName").val();
    var selectInputFoodType = $("#selectInputFoodType").val();
    var selectInputFoodTypeText = $("#selectInputFoodType").find("option:selected").text();
    var txtInputFoodPrice = $("#txtInputFoodPrice").val();
    return formDataMenu = {
        "foodIdEdit" : foodIdEdit,
        "txtInputRestaurantId": txtInputRestaurantId,
        "txtInputFoodName" : txtInputFoodName,
        "selectInputFoodType" : selectInputFoodType,
        "txtInputFoodPrice" : txtInputFoodPrice
    }
}