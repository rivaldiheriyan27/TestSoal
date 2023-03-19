import { useDispatch, useSelector } from 'react-redux'
import Navbar from "../../components/Navbar";
import React, { useEffect, useState } from "react";
import { booksRental,resetState } from './slice';
import CardBook from '../../components/CardBook';

export default function Book() { 
    const dispatch = useDispatch();

    const booksPackgeDatanew = useSelector(state => state.booksPackage)
    const {booksPackage} = booksPackgeDatanew
    console.log(booksPackgeDatanew, "data")

    const dataBook = async e => {
        const token = localStorage.getItem("accesToken")
        console.log(token)

        const data = await dispatch(booksRental({ token }))
    }

    useEffect(() =>{
        dataBook()
    }, [])

    return(
        <div>
            <Navbar />
            <div className="container md:container md:mx-auto bg-clay py-2 mt-4">
                <section className="bg-white py-8">
                    <div className="container mx-auto flex items-center flex-wrap pb-12">
                        <nav id="store" className="w-full z-30 px-6 py-1">
                            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
                                <div className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl">
                                        Book
                                </div>
                                {/* <div className="flex items-center" id="store-nav-content">
                                <a className="pl-3 inline-block no-underline hover:text-black" href="#">
                                            <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                                            </svg>
                                        </a>

                                        <a className="pl-3 inline-block no-underline hover:text-black" href="#">
                                            <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                                            </svg>
                                        </a>

                                    </div> */}
                            </div>
                        </nav>
                            {booksPackage.map(book => {
                                return(
                                    <CardBook 
                                        book={book}
                                        key={book.id}
                                    />
                                )
                            })}
                            {/* <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
                                <a href="#">
                                    <img className="hover:grow hover:shadow-lg" src="https://images.unsplash.com/photo-1508423134147-addf71308178?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80" />
                                    <div className="pt-3 flex items-center justify-between">
                                        <p className="">Product Name</p>
                                        <svg className="h-6 w-6 fill-current text-gray-500 hover:text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
                                        </svg>
                                    </div>
                                    <p className="pt-1 text-gray-900">£9.99</p>
                                </a>
                            </div>

                            <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
                                <a href="#">
                                    <img className="hover:grow hover:shadow-lg" src="https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80" />
                                    <div className="pt-3 flex items-center justify-between">
                                        <p className="">Product Name</p>
                                        <svg className="h-6 w-6 fill-current text-gray-500 hover:text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
                                        </svg>
                                    </div>
                                    <p className="pt-1 text-gray-900">£9.99</p>
                                </a>
                            </div>

                            <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
                                <a href="#">
                                    <img className="hover:grow hover:shadow-lg" src="https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80" />
                                    <div className="pt-3 flex items-center justify-between">
                                        <p className="">Product Name</p>
                                        <svg className="h-6 w-6 fill-current text-gray-500 hover:text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
                                        </svg>
                                    </div>
                                    <p className="pt-1 text-gray-900">£9.99</p>
                                </a>
                            </div>

                            <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
                                <a href="#">
                                    <img className="hover:grow hover:shadow-lg" src="https://images.unsplash.com/photo-1467949576168-6ce8e2df4e13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80" />
                                    <div className="pt-3 flex items-center justify-between">
                                        <p className="">Product Name</p>
                                        <svg className="h-6 w-6 fill-current text-gray-500 hover:text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
                                        </svg>
                                    </div>
                                    <p className="pt-1 text-gray-900">£9.99</p>
                                </a>
                            </div> */}
                    </div>
                </section>
                <footer className="container mx-auto bg-white py-8 border-t border-gray-400">
                    <div className="container flex px-3 py-8 ">
                        <div className="w-full mx-auto flex flex-wrap">
                            <div className="flex w-full lg:w-1/2 ">
                                <div className="px-3 md:px-0">
                                    <h3 className="font-bold text-gray-900">Library Rivaldi</h3>
                                    <p className="py-4">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel mi ut felis tempus commodo nec id erat. Suspendisse consectetur dapibus velit ut lacinia.
                                    </p>
                                </div>
                            </div>
                            <div className="flex w-full lg:w-1/2 lg:justify-end lg:text-right">
                                {/* <div className="px-3 md:px-0">
                                    <h3 className="font-bold text-gray-900">Social</h3>
                                    <ul className="list-reset items-center pt-3">
                                        <li>
                                            <a className="inline-block no-underline hover:text-black hover:underline py-1" href="#">Add social links</a>
                                        </li>
                                    </ul>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </footer>
        </div>
    </div>
    )
 }