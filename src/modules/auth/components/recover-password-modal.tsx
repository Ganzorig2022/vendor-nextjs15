"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type RecoverPasswordModalProps = {
	open: boolean;
	close: Dispatch<SetStateAction<boolean>>;
	recoveryUserName: string;
	setRecoveryUserName: Dispatch<SetStateAction<string>>;
	callback: () => void;
};

const RecoverPasswordModal = ({
	open,
	close,
	recoveryUserName,
	setRecoveryUserName,
	callback,
}: RecoverPasswordModalProps) => {
	return (
		<div>
			<Dialog
				open={open}
				onOpenChange={(state: boolean) => {
					close(state);
				}}>
				<DialogContent className="min-w-[300px]">
					<DialogHeader>
						<DialogTitle className="mb-2 border-b-2 pb-2">
							Нууц үг сэргээх
						</DialogTitle>
						<DialogDescription className="bg-merchant/70 px-5 py-2 rounded-md text-white">
							*Бүртгэлтэй цахим шуудан руу нууц үг илгээгдэх
							болно.
						</DialogDescription>
					</DialogHeader>
					<Input
						type="text"
						placeholder="Нэвтрэх нэр"
						value={recoveryUserName}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setRecoveryUserName(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								callback();
							}
						}}
					/>
					<DialogFooter>
						<DialogClose asChild>
							<Button
								type="button"
								variant="clear_search">
								Болих
							</Button>
						</DialogClose>
						<Button
							onClick={callback}
							type="button"
							className="ml-2"
							variant="info">
							Сэргээх
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default RecoverPasswordModal;
