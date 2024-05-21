'use client';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots';
import IconMenu from '@/components/icon/icon-menu';
import { Prisma } from '@prisma/client';
import React, { useState } from 'react';
import UserFormDialog from './user-form-dialog';
import Dropdown from '@/components/dropdown';
import { ContextMenu, ContextMenuItem, ContextMenuTrigger } from 'rctx-contextmenu';
import Swal from 'sweetalert2';
import { deleteUserAction } from '@/actions/user';
import ChangePasswordDialog from './change-password-dialog';

interface TableUserProp {
    users: Prisma.UserSelect[];
}

const TableUser = ({ users }: { users: any }) => {
    const [dialog, setDialog] = useState(false);
    const [changePassdDialog, setChangePassDialog] = useState(false);
    const [user, setUser] = useState<Prisma.UserSelect | null>(null);
    const [userId, setUserId] = useState<any>('');
    const handleClose = () => {
        setDialog(false);
        setUser(null);
    };

    const handleEdit = (user: Prisma.UserSelect) => {
        setUser(user);
        setDialog(true);
    };

    const confirmDelete = async (user: Prisma.UserSelect) => {
        Swal.fire({
            icon: 'warning',
            title: `Are you sure want to delete ${user.name}?`,
            text: `You won't be able to revert this!`,
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            padding: '2em',
            customClass: 'sweet-alerts',
            reverseButtons: true,
        }).then((result) => {
            if (result.value && user?.id) {
                // @ts-ignore
                deleteUserAction(user.id).then((data) => {
                    if (data.success) {
                        Swal.fire({ title: 'Deleted!', text: 'user has been deleted.', icon: 'success', customClass: 'sweet-alerts' });
                    } else {
                        Swal.fire({ title: 'Error!', text: 'Something went wrong!.', icon: 'error', customClass: 'sweet-alerts' });
                    }
                });
            }
        });
    };
    return (
        <div className="panel z-10 mt-2">
            <div>
                <button onClick={() => setDialog(true)} className="btn btn-primary">
                    Add User
                </button>
                <UserFormDialog user={user} isOpen={dialog} onClose={handleClose} />
            </div>
            <div className="table-responsive relative mt-4">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Type</th>
                            <th className="w-14">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: Prisma.UserSelect, i: number) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.role}</td>
                                <td>{user.type}</td>
                                <td>
                                    {/* <div className="dropdown absolute z-50">
                                        <Dropdown
                                            placement={'bottom-end'}
                                            btnClassName="btn p-0 rounded-none border-0 shadow-none dropdown-toggle text-black dark:text-white-dark hover:text-primary dark:hover:text-primary"
                                            button={
                                                <>
                                                    <IconHorizontalDots className="rotate-90" />
                                                </>
                                            }
                                        >
                                            <ul className="!min-w-[170px]">
                                                <li>
                                                    <button type="button">Action</button>
                                                </li>
                                                <li>
                                                    <button type="button">Another action</button>
                                                </li>
                                                <li>
                                                    <button type="button">Something else here</button>
                                                </li>
                                                <li>
                                                    <button type="button">Separated link</button>
                                                </li>
                                            </ul>
                                        </Dropdown>
                                    </div> */}
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => handleEdit(user)} className="btn btn-primary btn-sm px-1 py-0.5">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                setUserId(user);
                                                setChangePassDialog(true);
                                            }}
                                            className="btn btn-warning btn-sm px-1 py-0.5"
                                        >
                                            Reset
                                        </button>
                                        <button onClick={() => confirmDelete(user)} className="btn btn-danger btn-sm px-1 py-0.5">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {userId && <ChangePasswordDialog user={userId} isOpen={changePassdDialog} onClose={() => setChangePassDialog(false)} />}
        </div>
    );
};

export default TableUser;
