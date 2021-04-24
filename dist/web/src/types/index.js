"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUDActions = exports.JobMenuEnum = void 0;
var Industry;
(function (Industry) {
    Industry["INDUSTRY1"] = "INDUSTRY1";
    Industry["INDUSTRY2"] = "INDUSTRY2";
})(Industry || (Industry = {}));
var EmploymentType;
(function (EmploymentType) {
    EmploymentType["FULL_TIME"] = "FULL_TIME";
    EmploymentType["PART_TIME"] = "PART_TIME";
})(EmploymentType || (EmploymentType = {}));
var JobMenuEnum;
(function (JobMenuEnum) {
    JobMenuEnum[JobMenuEnum["SAVE"] = 0] = "SAVE";
    JobMenuEnum[JobMenuEnum["REPORT"] = 1] = "REPORT";
    JobMenuEnum[JobMenuEnum["NOT_INTERESTED"] = 2] = "NOT_INTERESTED";
})(JobMenuEnum = exports.JobMenuEnum || (exports.JobMenuEnum = {}));
var CRUDActions;
(function (CRUDActions) {
    CRUDActions["CREATE"] = "CREATE";
    CRUDActions["EDIT"] = "EDIT";
    CRUDActions["DELETE"] = "DELETE";
})(CRUDActions = exports.CRUDActions || (exports.CRUDActions = {}));
//# sourceMappingURL=index.js.map