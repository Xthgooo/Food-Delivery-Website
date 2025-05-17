"use client";

import { CreateAccountForm } from "./_components/CreateAccountForm";

export default function CreateAccountHome() {
	return (
		<div className="w-screen h-screen flex gap-12 items-center p-5 pl-40 justify-center  ">
			<CreateAccountForm />
			<div className="w-[856px] h-[904px]">
				<img
					src="https://images.unsplash.com/photo-1674555650084-ae4c3dcfe79c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZvb2QlMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D"
					className="w-full h-full bg-cover rounded-md"
				/>
			</div>
		</div>
	);
}
