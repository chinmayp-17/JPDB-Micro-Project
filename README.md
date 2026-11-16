# Student Enrollment Form using JsonPowerDB

This micro-project implements a web-based Student Enrollment Form that performs full CRUD operations (Create, Retrieve, Update, and Reset) using **JsonPowerDB (JPDB)** as the backend database.

## Table of Contents
- [Project Overview](#project-overview)
- [Database Details](#database-details)
- [Input Fields](#input-fields)
- [Benefits of JsonPowerDB](#benefits-of-jsonpowerdb)
- [Release History](#release-history)

---

## Project Overview

The Student Enrollment Form interacts with JsonPowerDB via REST APIs using AJAX calls. The primary key used for uniquely identifying student records is `Roll-No`.

### Key Features:
- **Default / Initial State**: On page load or after clicking any control button, an empty form is displayed. Cursor focus is automatically placed on the primary key field (`Roll-No`), while all other input fields and control buttons (`Save`, `Update`, `Reset`) remain disabled.
- **Dynamic Record Lookup**: When the user enters a `Roll-No`:
  - If the primary key does **not** exist in the database, `[Save]` and `[Reset]` buttons are enabled, other input fields are enabled for data entry, and cursor focus shifts to `Full-Name`.
  - If the primary key **exists** in the database, the stored record is fetched and populated into the form. The `Roll-No` field is disabled, other fields are enabled for editing, `[Update]` and `[Reset]` buttons are enabled, and cursor focus shifts to `Full-Name`.
- **Validation**: Checks that all form fields are filled before saving or updating.
- **Save Operation**: Inserts new student data into `STUDENT-TABLE` in `SCHOOL-DB` and resets the form to the initial state.
- **Update Operation**: Updates existing student data in `STUDENT-TABLE` using the internal record number (`rec_no`) and resets the form to the initial state.
- **Reset Operation**: Resets all fields and control buttons back to the initial state.

---

## Database Details

- **Database Name**: `SCHOOL-DB`
- **Relation Name**: `STUDENT-TABLE`
- **Primary Key**: `Roll-No`
- **Base URL**: `http://api.login2explore.com:5577`

---

## Input Fields

1. **Roll-No**: Primary Key (Numeric / Alphanumeric)
2. **Full-Name**: Student's complete name
3. **Class**: Class / Grade
4. **Birth-Date**: Date of birth (YYYY-MM-DD)
5. **Address**: Residential address
6. **Enrollment-Date**: Date of enrollment (YYYY-MM-DD)

---

## Benefits of JsonPowerDB

- **Proprietary High-Performance DBMS**: Built on PowerIndeX and Netty server for real-time, low-latency processing.
- **Serverless & Ready to Use**: No server-side scripting or SQL table schemas required.
- **RESTful API**: Simple HTTP endpoints for IML (Insert/Modify/Delete) and IRL (Retrieve) operations.
- **Multi-Mode Engine**: Schema-free, nimble, and dynamic document-oriented database.
- **Developer Friendly**: Easy integration with frontend frameworks, HTML, CSS, and jQuery.

---

## Release History

- **v1.0.0**: Initial release of Student Enrollment Form micro-project with Save, Update, and Reset operations connected to JsonPowerDB.
