import React, { useState } from 'react'
import {Box, DropZone, Label,DropZoneProps, BasePropertyProps } from 'admin-bro'
import Axios from 'axios';

const UploadPhoto = (props: BasePropertyProps) => {
	  const {  property,record, onChange } = props
	  const [NewImage,setNewImage]=useState([]);
	  const [NoOfFiles,setNoOfFiles]=useState(0);
	
	  var isUpload =false;
	  const onUpload = (files) => {
		     const newRecord = {...record}
		      const file = files.length &&  files[files.length -1]
            	    let  file_name='uploads/'+Date.now()+'_'+file.name;
		   	if(files.length==1){
				 setNoOfFiles(1);
					 var patt =/images\.[0-9]+/;
				 Object.keys(record.params).forEach(key => {
						 if(patt.test(key)){
						 delete record.params[key];
						 }
						 })
			}
			if(NoOfFiles > files.length){
				isUpload=false;	
				NewImage.forEach((img,index)=>{
						img=img.split("_")[1];
						var removeFlag=true;
						files.forEach((file)=>{
								if(file.name == img){
									removeFlag=false;
									}
								})			
							if(removeFlag){
								NewImage.splice(index,1);
							}
						})
				setNoOfFiles(NoOfFiles - 1);
			}else{
		      		setNoOfFiles(NoOfFiles +1);
				NewImage.push(file_name);
				isUpload=true;
			}

		      onChange(
				record.params["images"]=[...NewImage])

	if(isUpload){		      
		let formData = new FormData();
	        const config = {
		            header: { 'content-type': 'multipart/form-data' }
		            }
	        formData.append("file", file,file_name)
		       // save the Image we chose inside the Node Server 
		        Axios.post('/api/product/uploadImage', formData, config)
		            .then(response => {
		                    if (response.data.success) {
				   // console.log("img uploaded");
		                    } else {
	                        alert('Failed to save the Image in Server')
	                }
														            })

	}
		      event.preventDefault()
		    }
	  return (   
			  
		      <Box>
		        <Label>Upload Images</Label>
		        <DropZone

			onChange={onUpload}
			multiple
		       	/>
			<br />
		      </Box>
		    )
}
export default UploadPhoto
