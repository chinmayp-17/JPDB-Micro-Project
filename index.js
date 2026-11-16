var connToken = "90933398|-31949150761301550|90904389";
var dbName = "SCHOOL-DB";
var relationName = "STUDENT-TABLE";
var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";

function resetForm() {
    $("#rollNo").val("");
    $("#fullName").val("");
    $("#class").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollmentDate").val("");

    $("#rollNo").prop("disabled", false);
    $("#fullName").prop("disabled", true);
    $("#class").prop("disabled", true);
    $("#birthDate").prop("disabled", true);
    $("#address").prop("disabled", true);
    $("#enrollmentDate").prop("disabled", true);

    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);

    localStorage.removeItem("rec_no");
    $("#rollNo").focus();
}

function validateAndGetFormData() {
    var rollNo = $("#rollNo").val().trim();
    var fullName = $("#fullName").val().trim();
    var className = $("#class").val().trim();
    var birthDate = $("#birthDate").val().trim();
    var address = $("#address").val().trim();
    var enrollmentDate = $("#enrollmentDate").val().trim();

    if (rollNo === "") {
        alert("Roll-No is required.");
        $("#rollNo").focus();
        return "";
    }
    if (fullName === "") {
        alert("Full-Name is required.");
        $("#fullName").focus();
        return "";
    }
    if (className === "") {
        alert("Class is required.");
        $("#class").focus();
        return "";
    }
    if (birthDate === "") {
        alert("Birth-Date is required.");
        $("#birthDate").focus();
        return "";
    }
    if (address === "") {
        alert("Address is required.");
        $("#address").focus();
        return "";
    }
    if (enrollmentDate === "") {
        alert("Enrollment-Date is required.");
        $("#enrollmentDate").focus();
        return "";
    }

    var jsonObj = {
        "Roll-No": rollNo,
        "Full-Name": fullName,
        "Class": className,
        "Birth-Date": birthDate,
        "Address": address,
        "Enrollment-Date": enrollmentDate
    };
    return JSON.stringify(jsonObj);
}

function getStudent() {
    var rollNo = $("#rollNo").val().trim();
    if (rollNo === "") {
        resetForm();
        return;
    }

    var jsonStr = JSON.stringify({ "Roll-No": rollNo });
    var getReq = createGET_BY_KEYRequest(connToken, dbName, relationName, jsonStr);
    var resJson = executeCommandAtGivenBaseUrl(getReq, jpdbBaseURL, jpdbIRL);

    if (resJson && resJson.status === 400) {
        $("#fullName").prop("disabled", false);
        $("#class").prop("disabled", false);
        $("#birthDate").prop("disabled", false);
        $("#address").prop("disabled", false);
        $("#enrollmentDate").prop("disabled", false);

        $("#save").prop("disabled", false);
        $("#update").prop("disabled", true);
        $("#reset").prop("disabled", false);

        $("#fullName").focus();
    } else if (resJson && resJson.status === 200) {
        var data = JSON.parse(resJson.data);
        localStorage.setItem("rec_no", data.rec_no);
        var record = data.record;

        $("#fullName").val(record["Full-Name"] || record.fullName || "");
        $("#class").val(record["Class"] || record.class || "");
        $("#birthDate").val(record["Birth-Date"] || record.birthDate || "");
        $("#address").val(record["Address"] || record.address || "");
        $("#enrollmentDate").val(record["Enrollment-Date"] || record.enrollmentDate || "");

        $("#rollNo").prop("disabled", true);
        $("#fullName").prop("disabled", false);
        $("#class").prop("disabled", false);
        $("#birthDate").prop("disabled", false);
        $("#address").prop("disabled", false);
        $("#enrollmentDate").prop("disabled", false);

        $("#save").prop("disabled", true);
        $("#update").prop("disabled", false);
        $("#reset").prop("disabled", false);

        $("#fullName").focus();
    }
}

function saveData() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReq = createPUTRequest(connToken, jsonStr, dbName, relationName);
    var resJson = executeCommandAtGivenBaseUrl(putReq, jpdbBaseURL, jpdbIML);
    if (resJson && resJson.status === 200) {
        alert("Student data saved successfully!");
    } else {
        alert("Failed to save data: " + (resJson ? resJson.message : "Unknown error"));
    }
    resetForm();
}

function updateData() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var recNo = localStorage.getItem("rec_no");
    if (!recNo) {
        alert("Record number not found for update.");
        resetForm();
        return;
    }
    var updateReq = createUPDATERecordRequest(connToken, jsonStr, dbName, relationName, recNo);
    var resJson = executeCommandAtGivenBaseUrl(updateReq, jpdbBaseURL, jpdbIML);
    if (resJson && resJson.status === 200) {
        alert("Student data updated successfully!");
    } else {
        alert("Failed to update data: " + (resJson ? resJson.message : "Unknown error"));
    }
    resetForm();
}

function createPUTRequest(token, jsonObj, dbName, relName) {
    var putRequest = "{\n"
        + "\"token\" : \""
        + token
        + "\","
        + "\"dbName\": \""
        + dbName
        + "\",\n" + "\"cmd\" : \"PUT\",\n"
        + "\"rel\" : \""
        + relName + "\","
        + "\"jsonStr\": \n"
        + jsonObj
        + "\n"
        + "}";
    return putRequest;
}

function createGET_BY_KEYRequest(token, dbname, relationName, jsonObjStr, createTime, updateTime) {
    if (createTime === undefined || createTime !== true) {
        createTime = false;
    }
    if (updateTime === undefined || updateTime !== true) {
        updateTime = false;
    }
    var req = "{\n"
        + "\"token\" : \""
        + token
        + "\",\n" + "\"cmd\" : \"GET_BY_KEY\",\n"
        + "\"dbName\": \""
        + dbname
        + "\",\n"
        + "\"rel\" : \""
        + relationName
        + "\",\n"
        + "\"jsonStr\":\n"
        + jsonObjStr
        + ",\n"
        + "\"createTime\":"
        + createTime
        + ",\n"
        + "\"updateTime\":"
        + updateTime
        + "\n"
        + "}";
    return req;
}

function createUPDATERecordRequest(token, jsonObj, dbName, relName, reqId) {
    var req = "{\n"
        + "\"token\" : \""
        + token
        + "\","
        + "\"dbName\": \""
        + dbName
        + "\",\n" + "\"cmd\" : \"UPDATE\",\n"
        + "\"rel\" : \""
        + relName
        + "\",\n"
        + "\"jsonStr\":{ \""
        + reqId
        + "\":\n"
        + jsonObj
        + "\n"
        + "}\n"
        + "}";
    return req;
}

function executeCommandAtGivenBaseUrl(reqString, dbBaseUrl, apiEndPointUrl) {
    var url = dbBaseUrl + apiEndPointUrl;
    var jsonObj;
    $.ajaxSetup({ async: false });
    $.post(url, reqString, function(result) {
        if (typeof result === "object") {
            jsonObj = result;
        } else {
            jsonObj = JSON.parse(result);
        }
    }).fail(function(result) {
        if (result && result.responseText) {
            try {
                jsonObj = JSON.parse(result.responseText);
            } catch (e) {
                jsonObj = null;
            }
        }
        if (!jsonObj && url.indexOf("http://") === 0) {
            var httpsUrl = url.replace("http://", "https://");
            $.post(httpsUrl, reqString, function(res2) {
                jpdbBaseURL = "https://api.login2explore.com:5577";
                if (typeof res2 === "object") {
                    jsonObj = res2;
                } else {
                    jsonObj = JSON.parse(res2);
                }
            }).fail(function(res2) {
                if (res2 && res2.responseText) {
                    try {
                        jsonObj = JSON.parse(res2.responseText);
                        jpdbBaseURL = "https://api.login2explore.com:5577";
                    } catch (e2) {
                        jsonObj = null;
                    }
                }
            });
        }
    });
    $.ajaxSetup({ async: true });
    return jsonObj;
}

$(document).ready(function() {
    resetForm();
    $("#rollNo").on("keydown", function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            getStudent();
        }
    });
});
