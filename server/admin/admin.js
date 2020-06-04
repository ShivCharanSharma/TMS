const AdminBro = require('admin-bro');
const AdminBroExpress = require('admin-bro-expressjs');
const AdminBroMongoose = require('admin-bro-mongoose');
const User = require('../models/User');
const Booking = require('../models/Booking');
const packages = require('../models/Package');
const Payment = require('../models/Payment');
const Axios = require('axios');
const bcrypt = require('bcrypt');
const  os  =require('os');
const config = require('../config/key')
AdminBro.registerAdapter(AdminBroMongoose);
const logoHost=process.env.NODE_ENV === "production"?os.hostname():'localhost:5000';

const adminBro = new AdminBro({
  rootPath: '/admin',
//    databases:[connect],
//	loginPath: 'http://localhost:3000/login',
    resources: [
	    {resource:Booking,
		    sort:{
		    	direction:'desc',
		    },
		    options:{
		    	properties:{
				Action:{components:{show:AdminBro.bundle('BookingActions.tsx'),
					    		list:AdminBro.bundle('BookingActions.tsx'),
			    				},
					isVisible:{edit:false,show:true,filter:false,list:true,new:false},
					position:1,
			   		 },
				_id:{isVisible:{list:false,edit:false,new:false,show:true,},
					position:3,
					},
				packageTitle:{isVisible:false,},
				comments:{isVisible:false,},
				packageId:{},
				status:{position:2,
					availableValues:[{value:"Booked",label:"Booked"},{value:"Cancellation Declined",label:"Cancellation Declined"},{value:"cancellation",label:"cancellation"},{value:"Order Complete",label:"Order Complete"},{value:"Cancelled",label:"Cancelled"}],	
				},
				paymentId:{isVisible:{list:false,edit:false,new:false,show:true,filter:true},},
				orderId:{isVisible:{list:false,edit:false,new:false,show:true,filter:true,},},
				refId:{isVisible:{list:false,edit:false,new:false,show:true,filter:true},},
				bookingDate:{position:8},
				bookedByUserId:{position:4},
				packageId:{position:5},
				price:{position:6},

				quantity:{position:7}

			},
			actions:{
				edit:{isVisible:false},
				new:{isVisible:false},
				bulkDelete:{isVisible:true},
			
			}
		},
	    },
	    {resource:Payment,
	    		options:{
				actions:{
					edit:{isVisible:false},
					new:{isVisible:false},
					
				}
			}		
	    },
     {
       resource:  packages,
       options: {
	       properties:{
		       images:{ isArray:true, 
			       components:{  edit: AdminBro.bundle('imageUpload.tsx'),  },
		       },
		       description:{
			       type:'textarea',
		       }
	        },
	       actions:{
		       edit:{
			       before: async (req) =>{

				       return req;
			       }
		     		
			},		      
		       
	     }
       }
     },
	{
		resource:User,
		options:
		{
			properties:{
				cart:{isVisible:false},
				token:{isVisible:false},
				tokenExp:{isVisible:false},
				showPaymentStatus:{isVisible:false},
				contactNo:{isVisible:false}	
			},
			name:"shiv",
		},
	}
   ],
	dashboard:
	{
		component:AdminBro.bundle('dashboard.tsx')

	},
	

	branding:{
		logo:false,//'http://'+logoHost+'/api/uploads/demoBlue.jpg',
		companyName:'Travel Company',
		softwareBrothers:false,
		
	},
})
const authAdmin=async (email ,password)=>{
	const user = await User.findOne({email});
		if(!user){
			return false;
		}
		const isMatched = await bcrypt.compare(password, user.password)
	        if (isMatched) {
			if(user.role == 0){
		              return user
			}
	        }

	return false;
	 
}
const sessionOptions= {         resave:true,
	                       saveUninitialized: true}

module.exports = adminRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro,{
	
	authenticate:authAdmin,
	cookieName:config.cookieName,
	cookiePassword: config.secretKey,
	},
	null,
	sessionOptions
	)
