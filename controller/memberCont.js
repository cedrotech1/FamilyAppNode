const member=require("../models/member");
const b=require("bcrypt");
const jwt = require("jsonwebtoken");



//   ________________ALL____________________________

 //   ________________ADD____________________________
 const Add = async (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  // const gender = req.body.gender;
  // const age = req.body.age;
  // const roomid = req.body.roomid;
  const username = req.body.username;
  let password=req.body.password;
  try {

          b.hash(password,10,async (err,hash)=>{

            if(err)
            {
              console.log(err)
            }else{
              password=hash;
              const data = { fname, lname ,username, password};
              const onemember = new member(data);
                    
              const response = await onemember.save();
              res.send(response);
            }     
      })  
  } catch (err) {
    res.send({ error: err });
  }
};



// ____________________________________LIST OF MEMBERS
const getList=async (req, res) => {
  try {
    const data= await member.find();
      //  const data= await member.find({}, { fname: 1,lname: 1});
 res.send(data) 
  } catch (error) {
      res.send(error)
  }  
}





//   __________________UPDATE________________________________________

const Update=(req, res) => {
  try {

   const id=req.params.id;

   const fname=req.body.fname;
   const lname=req.body.lname;
   const gender=req.body.gender;
   const age=req.body.age;
   const username=req.body.username;
  //  const roomid=req.body.roomid;
   
   const data={fname,lname,age,gender,username}
   
   // const oneskills = new skills(data);
   member.findByIdAndUpdate(id,data)
           .then(() => {
               // Process the retrieved data
               res.send(data)
               })
               .catch((error) => {
               console.error('Error retrieving data:', error);
               }); 
   
  } catch (error) {
   console.log(error)
  } 
}





//   ________________DELETE____________________________

const Delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedMember = await member.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({ error: 'member not found' });
    }

    res.send({ member: deletedMember });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






const Login = async (req, res) => {
  try {
    const usernamex = req.body.usernamex;
    const passwordx = req.body.passwordx;

    const memberData = await member.findOne({ username: usernamex }).select('password username fname lname');

        if (!memberData) {
          res.send({message:'invalid username!'});
          return;
        }

        const storedPassword = memberData.password;
  
    // // Compare the provided password with the stored hashed password
            const passwordMatch = await b.compare(passwordx, storedPassword);
            if (passwordMatch) 
            {
              const secret="am cedrick";
              // req.session.member=usernamex;
              // console.log(req.session.member);
               const token=jwt.sign({data:memberData},secret);
              res.send({message:'Login successful!',token});
            } else {
              res.send({message:'Invalid  password'});
            }

  } catch (error) {
    res.send(error);
  }
};







































































const getALL=async (req, res) => {
    try {
         const data= await member.find({
          'roomid': { $exists: true },
        }).populate({
          path: 'roomid',
          select: 'roomnumber',
          populate: {
            path: 'hostelid',
            select: 'name location',
          }, // Specify the fields you want to include
        });
         
            res.send({data:data}) 
    } catch (error) {
        res.send(error)
    }  
  }

  const Operation=async (req, res) => {
    try {
         let  data= await member.find().populate("roomid");
       
        data= data.filter(data=> data.roomid.roomnumber>100)
         
            res.send({data:data}) 



    } catch (error) {
        res.send(error)
    }  
  }

  const verifyauto=(req,res,next)=>{
    const secret="am cedrick"
    const token=req.headers['autorization'];
    // const token=jwt.sign({name:"cedrick"},secret);
    const verify=jwt.verify(token,secret,(err,decode)=>{
      if(err)
      {
        res.send(err.message)
      }else{
        console.log(decode)
         next();
      }
    })       
  }

 




 






  module.exports={
    getALL,
    Add,
    Update,
    Delete,
    getList,
    Operation,
    Login,
    verifyauto
  }