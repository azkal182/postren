'use client';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots';
import IconMenu from '@/components/icon/icon-menu';
import { Prisma } from '@prisma/client';
import React, { useState } from 'react';
import UserFormDialog from './user-form-dialog';
import Dropdown from '@/components/dropdown';

interface TableUserProp {
    users: Prisma.UserSelect[];
}

const TableUser = ({ users }: { users: any }) => {
    const [dialog, setDialog] = useState(false);
    const [user, setUser] = useState<Prisma.UserSelect | null>(null);
    const handleClose = () => {
        setDialog(false);
        setUser(null);
    };

    const handleEdit = (user: Prisma.UserSelect) => {
        setUser(user);
        setDialog(true);
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
                            <th className="w-8"></th>
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
                                    <button onClick={() => handleEdit(user)} className="btn btn-primary btn-sm">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableUser;
