const family=require("../models/family");
const b=require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require('uuid');



//   ________________ALL____________________________

 //   ________________ADD____________________________


 const CreateFamily = async (req, res) => {
   const name = req.body.name;
   const bio = req.body.bio;
   const admin = req.body.admin;
 
   const batch = uuid.v4(); // Generate a unique UUID
 
   try {
     const data = { name, bio, batch,admin };
     const onemember = new family(data); // Assuming "family" is a valid Mongoose model
     const response = await onemember.save(); // Make sure your model is properly defined and connected to your database
 
     res.send({ response: response, rand: batch });
   } catch (err) {
     res.status(500).send({ error: err.message });
   }
 };
 

 const UpdateBatch=async (req, res) => {
  const familyId = req.body.familyId;
  const newBatch = uuid.v4(); // Generate a new unique UUID

  try {
    const updatedFamily = await family.findByIdAndUpdate(
      familyId,
      { batch: newBatch },
      { new: true }
    );

    if (!updatedFamily) {
      return res.status(404).send({ error: "Family not found" });
    }

    res.send({ updatedFamily, newBatch });
  } catch (err) {
    res.status(500).send({ error: err.message });

  }
}




const Updatefamily = async (req, res) => {
    const familyId = req.body.familyId;
    const newName = req.body.newName;
    const newBio = req.body.newBio;
    try {
      
      const updatedFamily = await family.findByIdAndUpdate(familyId,{ name: newName, bio: newBio },{ new: true });

      if (!updatedFamily) {
        return res.status(404).send({ error: "Family not found" });
      }
    
      res.send({ updatedFamily });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
}
// const family = require("../models/family");

const join = async (req, res) => {
  const batch = req.body.batch;
  const memberid = req.body.memberid;
  const familyid = req.body.familyid;

  try {
    // Check if a family with the specified _id exists
    const family = await family.findOne({ _id: familyid });

    if (!family) {
      return res.status(404).json({ error: 'Family not found for the provided familyid.' });
    }

    // Push the member ID into the family's members array
    const updatedFamily = await family.findByIdAndUpdate(
      familyid,
      { $push: { members: memberid } },
      { new: true }
    );

    res.status(200).json({ updatedFamily });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const getList=async (req, res) => {
  try {
    const data= await family.find();
      //  const data= await member.find({}, { fname: 1,lname: 1});
 res.send(data) 
  } catch (error) {
      res.send(error)
  }  
}


  module.exports={
    getList,
    CreateFamily,
    UpdateBatch,
    Updatefamily,
    join,
    
  }