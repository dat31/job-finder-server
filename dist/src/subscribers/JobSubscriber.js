"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../entities");
class JobSubscriber {
    listenTo() {
        return entities_1.Job;
    }
    afterLoad(entity, event) {
        console.log("LOAD JOB");
    }
}
exports.default = JobSubscriber;
//# sourceMappingURL=JobSubscriber.js.map