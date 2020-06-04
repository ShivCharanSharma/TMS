import React ,{useState}from 'react'
import {Modal, Result} from 'antd'
function StatusModel(props) {

	const [Visible,setVisible]=useState(true);
	  const handleCancel = () => {
		  	props.removeStatus();
		      setVisible(false);
		    };



return (
<div>
        <Modal
	          visible={Visible}
	      //    title="Title"
	        //  onOk={handleOk}
	          onCancel={handleCancel}
	          footer={[
			            ]}
	        >
	{ props.statusType ?
	
		                        <Result
		                            status="success"
		                            title="Successfully Purchased Packages"
		                        /> :
		                        //ShowFailure 
		                        <Result
		                            status="warning"
		                            title="Transection Failed"
		                        /> 
	
	}
	        </Modal>
</div>
    )
}

export default StatusModel
