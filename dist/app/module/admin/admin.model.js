"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const admin_constrant_1 = require("./admin.constrant");
const adminSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
            middleName: {
                type: String,
                required: false,
            },
        },
        required: true,
    },
    gender: {
        type: String,
        enum: admin_constrant_1.gender,
    },
    dateOfBirth: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    contactNo: {
        type: String,
        unique: true,
        required: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: admin_constrant_1.bloodGroup,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    managementDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ManagementDepartment",
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Admin = (0, mongoose_1.model)("Admin", adminSchema);
