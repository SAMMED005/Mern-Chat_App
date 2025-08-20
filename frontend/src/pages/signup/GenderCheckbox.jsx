const GenderCheckbox = ({onCheckboxChange,selectedgender}) => {
    	return (
    		<div className='flex '>
    			<div className='form-control'>
    				<label className={`label gap-2 ml-2 cursor-pointer`}>
    					<span className='label-text text-white'>Male</span>
    					<input type='checkbox' className='checkbox border-slate-50 ' 
						checked={selectedgender==="male"}
						onChange={()=>onCheckboxChange("male")}
						
						/>
    				</label>
    			</div>
    			<div className='form-control'>
    				<label className={`label gap-2 ml-2 cursor-pointer`}>
    					<span className='label-text text-white'>Female</span>
    					<input type='checkbox' className='checkbox border-slate-50' 
							checked={selectedgender==="female"}
							onChange={()=>onCheckboxChange("female")}
						
						/>
    				</label>
    			</div>
    		</div>
    	);
    };
    export default GenderCheckbox;