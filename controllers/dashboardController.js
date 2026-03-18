const Bill = require('../models/Billmodel')
const Users = require('../models/usermodel')
const Wholsalers = require('../models/ResgisterShopmodel')


exports. getDashboard = async (req,res)=>{

   console.log('inside getDashboard')

   const wholsalerId = req.id

try{

const orders = await Bill.find({wholsalerId})

const totalOrders = orders.length
const totalEarnings = orders.reduce((sum, order) => sum + order.grandTotal, 0);

let monthlyOrders = Array(12).fill(0)
let monthlyEarnings = Array(12).fill(0)

orders.forEach(order=>{
   const month = new Date(order.createdAt).getMonth()
   monthlyOrders[month]++
   monthlyEarnings[month] += order.grandTotal  
})








const months = [
 "Jan","Feb","Mar","Apr","May","Jun",
 "Jul","Aug","Sep","Oct","Nov","Dec"
]

const chartData = months.map((item,index)=>({
   name:item,
   orders:monthlyOrders[index],
     earnings: monthlyEarnings[index]
}))

res.status(200).json({
totalOrders,
chartData,
totalEarnings

})

}catch(err){
res.status(500).json(err)
}

}



exports.adminDashboard = async(req,res)=>{
   console.log('inside admin dashboard')

   try {

      const RetailUsers = await Users.find({ 'role': "retailUser" })
      const WholsaleUsers = await Wholsalers.find()

      const totalUsers = RetailUsers.length
      const totalWholsalers = WholsaleUsers.length

      let monthlyRetailers = Array(12).fill(0)
      let monthlyWholsalers = Array(12).fill(0)


      RetailUsers.forEach(item=>{
         const month = new Date(item.createdAt).getMonth()
         monthlyRetailers[month]++
      })

      WholsaleUsers.forEach(item=>{
         const month = new Date(item.createdAt).getMonth()
         monthlyWholsalers[month]++
      })




      const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
      ]

      const chartDetails = months.map((item,index)=>({
         name:item,
         RetailUsers:monthlyRetailers[index],
         WholsaleUsers:monthlyWholsalers[index]

      }))

      res.status(200).json({totalUsers,totalWholsalers,chartDetails})    


   } catch (error) {
      res.status(500).json(error)
   }


}




// module.exports = {getDashboard}