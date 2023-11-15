
const b=require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require('uuid');


const Family=require("../models/family");
//   ________________ALL____________________________

 //   ________________ADD____________________________


 const CreateFamily = async (req, res) => {
   const name = req.body.name;
   const bio = req.body.bio;
   const admin = req.body.admin;

   const batch = uuid.v4(); // Generate a unique UUID
 
   try {
     const data = { name, bio, batch,admin };
     const onemember = new Family(data); // Assuming "family" is a valid Mongoose model
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
    const updatedFamily = await Family.findByIdAndUpdate(
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
      
      const updatedFamily = await Family.findByIdAndUpdate(familyId,{ name: newName, bio: newBio },{ new: true });

      if (!updatedFamily) {
        return res.status(404).send({ error: "Family not found" });
      }
    
      res.send({ updatedFamily });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
}
// const family = require("../models/family");
// const Family = require('../models/family'); // Adjust the path based on your file structure

// const join = async (req, res) => {
//   const familyId = req.body.familyId;
//   const name = req.body.name;
//   const newBio = req.body.newBio;
//   const memberId = req.body.memberId;

//   try {
//     // const updatedFamily = await Family.findByIdAndUpdate(
//     //   familyId,
//     //   { $push: { members: memberId }, name: newName, bio: newBio },
//     //   { new: true }
//     // );
//     const updatedFamily = await family.findByIdAndUpdate(
//       familyId,
//       { name: name },
//       { new: true }
//     );

//     if (!updatedFamily) {
//       return res.status(404).send({ error: "Family not found" });
//     }

//     res.send({ updatedFamily });
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// }

const join = async (req, res) => {
  const batch = req.body.batch;
  const memberid = req.body.memberid;
  const familyid = req.body.familyid;

  try {
    // Check if a family with the specified _id exists
    const family = await Family.findById(familyid);

    // Check if the batch matches the family batch
    if (familyid !== family._id) {
      return res.status(400).json({ error: 'that family does not exist !' });
    }


    if (!family) {
      return res.status(404).json({ error: 'Family not found for the provided familyid.' });
    }

    // Check if the memberid is already in the family.members array
    if (family.members.includes(memberid)) {
      return res.status(400).json({ error: 'Member is already part of the family.' });
    }

    // Check if the batch matches the family batch
    if (batch !== family.batch) {
      return res.status(400).json({ error: 'Batch of the member does not match the family batch.' });
    }
     
    // If not, push the memberid to the family.members array
    family.members.push(memberid);

    // Save the updated family document
    await family.save();

    res.status(200).json({ family });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





const getList=async (req, res) => {
  try {
    const data= await Family.find();
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