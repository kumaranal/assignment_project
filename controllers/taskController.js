const taskData = require("../models/taskModel")
const userlogin = require("../models/loginModel")
require('dotenv').config();


const getspecificfn = async (req, res) => {
    if (req.params.id == "" || req.params.id == null || (!req.params.id)) {
        return res.status(400).json({ msg: "_id is INVALID" });
    }
    console.log(req.params.id)
    taskData.find({ _id: req.params.id, userId: req.body.userId })
        .then((data) => {
            if (data == "") {
                return res.status(200).json({ msg: "Fail", data: "Request Data INVALID" })

            }
            else {
                return res.status(200).json({ msg: "SUCCESS", data: data })

            }

        })
        .catch((err) => {
            console.log(err)
            return res.status(400).json({ msg: "Fail", cause: "Request Data INVALID" })
        })
};


const getallfn = async (req, res, next) => {
    let page = parseInt(req.query.page) || 1;
    console.log(page)
    let limit = parseInt(req.query.limit) || 2;
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    let result = {};
    // change model.length to model.countDocuments() because you are counting directly from mongodb
    console.log("end", await taskData.countDocuments().exec())
    let url = req.url.split("?")[0]
    console.log(url)
    const protocol = req.protocol;
    const host = req.hostname;
    const port = process.env.PORT || 7000;

    const fullUrl = `${protocol}://${host}:${port}/api${url}`
    if (endIndex < (await taskData.countDocuments().exec())) {

        result.next = fullUrl + `?page=${page + 1}&limit=${limit}`;
    }
    if (startIndex > 0) {
        result.previous = fullUrl + `?page=${page - 1}&limit=${limit}`;
    }
    try {
        //       .limit(limit).skip(startIndex) replaced the slice method because 
        //       it is done directly from mongodb and they are one of mongodb methods
        result.results = await taskData.find({ userId: req.body.userId }).limit(limit).skip(startIndex);
        res.paginatedResult = result;
        console.log("result", result)
        return res.status(200).json({ msg: "SUCCESS", data: result })
    } catch (e) {
        res.status(500).json({ message: "Fail" });
    }
};




const createfn = async (req, res) => {
    console.log("req", req.body);
    const userDATA = {};
    for (const [key, value] of Object.entries(req.body)) {
        if (value == null || value == "") {
            return res.status(400).json({ msg: "Fail", data: `${key} value is INVALID` });
        }
        if (key == 'roleId' || key == 'auth') {
            continue;
        }
        userDATA[key] = value;

    }

    console.log("userData", userDATA)


    if (userDATA) {
        taskData.create(userDATA)
            .then(result => {
                console.log("data", result);
                {
                    return res.status(200).json({ msg: "Success", data: result });
                }
            })
            .catch(err => {
                console.log(err);
                return res.status(400).json({ msg: "Fail" });

            })
    }
    else {
        return res.status(400).json({ msg: "Fail" });

    }


}

const updatefn = async (req, res) => {
    console.log("req", req.body);
    if (req.params.id == "" || req.params.id == null || (!req.params.id)) {
        return res.status(400).json({ msg: "Fail", data: "_id is INVALID" });
    }
    if (req.body) {

        const userDATA = {};
        for (const [key, value] of Object.entries(req.body)) {
            if (value == null || value == "") {
                return res.status(400).json({ msg: "Fail", data: `${key} value is INVALID` });
            }
            if (key == 'roleId' || key == 'auth') {
                continue;
            }
            userDATA[key] = value;
        }
        console.log("userDat", userDATA)
        taskData
            .findById(req.params.id)
            .then((data) => {

                if (data == null) {
                    return res.status(400).json({ msg: "Fail", data: "_id is INVALID" });
                }
                if (req.body.userId == data.userId) {
                    taskData
                        .findByIdAndUpdate(req.params.id, { $set: userDATA }, { new: true })
                        .then((data) => {

                            if (data == null) {
                                return res.status(400).json({ msg: "Fail", data: "_id is INVALID"});
                            }
                            res.send({msg: "Success", data: "update Successfully..."})


                        })
                        .catch((err) => {
                            console.log(err)
                            res.status(400).json({msg: "Fail", data: "_id is INVALID"});
                        })
                }
                else {
                    return res.status(400).json({msg: "Fail", data: "_id is INVALID" });
                }
            })
            .catch((err) => {
                console.log(err)
                res.status(400).json({msg: "Fail", data: "_id is INVALID" });
            })
        ///////////////

    }
    else{
        return res.status(400).json({msg: "Fail", data: "_id is INVALID"});

    }
}
    const deletefn = async (req, res) => {
        console.log("req delete", req.body);
        console.log("req query delete", req.params.id);

        if (req.params.id == "" || (req.params.id == null) || (!req.params.id)) {
            return res.status(400).json({msg: "Fail", data: "_id is INVALID"});
        }
        taskData
            .findById(req.params.id)
            .then((data) => {

                if (data == null) {
                    return res.status(400).json({msg: "Fail", data: "_id is INVALID"});
                }
                if (req.body.userId == data.userId) {
                    taskData
                        .findByIdAndDelete(req.params.id)
                        .then((data) => {

                            if (data != null) {
                                res.send({msg: "Success", data: "delete Successfully..."})
                            }
                            else {
                                return res.status(400).json({msg: "Fail", data: "_id is INVALID"});
                            }

                        })
                        .catch((err) => {
                            console.log(err)
                            return res.status(400).json({msg: "Fail", data: "_id is INVALID"});
                        })
                }
                else {
                    return res.status(400).json({msg: "Fail", data: "_id is INVALID"});
                }

            })
            .catch((err) => {
                console.log(err)
                res.status(400).json({msg: "Fail", data: "_id is INVALID"});
            })

    }


    module.exports = { getallfn, getspecificfn, createfn, updatefn, deletefn };