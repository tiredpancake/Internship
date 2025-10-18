import { Notification } from "@/types/notification.interface"
import { generateID } from "@/utiles/string";
import { create } from "zustand";

type NotificationStata={
    notifications :Notification[];
    showNotification :(notification : Omit<Notification,'id'>)=> void
    dismissNotification :(id:string)=>void;
}


export const useNotificationStore=create<NotificationStata>(
    (set,get)=>({
        notifications:[],
        showNotification:(notification)=>{
            const id=generateID();
            set(state=>({
                notifications:[...state.notifications,{id:id,...notification}]
            }))

            setTimeout(()=>{
                get().dismissNotification(id);
            },notification.duration);
        },
        dismissNotification:(id)=>{
            set(state=>({ 
                notifications:state.notifications.filter(p=>p.id !== id)
            }));
        }
    })
)