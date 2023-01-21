import Head from 'next/head'
import { trpc } from '../utils/trpc';

import { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Prisma, Project, Task } from '@prisma/client'
import { ChevronDownIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid'
import {
  Bars3Icon,
  BellIcon,
  FlagIcon,
  BoltIcon,
  FolderOpenIcon,
  CalendarDaysIcon,
  PencilSquareIcon,
  TrophyIcon,
  WrenchScrewdriverIcon,
  PresentationChartBarIcon,
  ScaleIcon,
  NoSymbolIcon,
  XMarkIcon,
	FunnelIcon
} from '@heroicons/react/24/outline'

import { useRouter } from 'next/router'
import { NextPage } from 'next';

import Tag from './../components/tags';
import TaskCard from '../components/taskCard';



// TODO: replace this test data with actual functionality
const navigation = [
  {
    name: 'Inboxes',
    href: '#',
    children: [
      { name: 'Technical Support', href: '#' },
      { name: 'Sales', href: '#' },
      { name: 'General', href: '#' },
    ],
  },
  { name: 'Reporting', href: '#', children: [] },
  { name: 'Settings', href: '#', children: [] },
]

const sidebarNavigation = [
  { name: 'Tasks', href: '#tasks', icon: BoltIcon, current: true },
  { name: 'Notes', href: '#notes', icon: PencilSquareIcon, current: false },
  { name: 'Compare', href: '#compare', icon: ScaleIcon, current: false },
  { name: 'Calendar', href: '#calendar', icon: CalendarDaysIcon, current: false },
  { name: 'Goals', href: '#goals', icon: TrophyIcon, current: false },
  { name: 'Analytics', href: '#analytics', icon: PresentationChartBarIcon, current: false },
  { name: 'Configuration', href: '#config', icon: WrenchScrewdriverIcon, current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const HomePage: NextPage | null = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { mutate: addTask } = trpc.task.addTask.useMutation();
  const projects = trpc.project.getProjects.useQuery({
    userId: session?.user?.id
  }).data!;

	const [showModal, setShowModal] = useState(false);
	const [newTaskName, setnewTaskName] = useState("");
	const [newTaskDescrip, setnewTaskDescrip] = useState("");
	const [currentProject, setCurrentProject] = useState(0)


  useEffect(() => {
    if (!session) {
      router.push("/")
    }
  });

  return (
    <>
      <div className="flex h-screen flex-col">
        {/* Head */}
        <Head>
          <title>Flow</title>
          <meta name="description" content="idk yet, just a tool to help manage life/work flow" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* Top nav */}
        <header className="relative flex h-16 flex-shrink-0 items-center bg-white">
          {/* Logo area */}
          <div className="absolute inset-y-0 left-0 md:static md:flex-shrink-0">
            <a
              href="#"
              className="flex h-16 w-16 items-center justify-center bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 md:w-20"
            >
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=white"
                alt="Your Company"
              />
            </a>
          </div>

          {/* Picker area */}
          <div className="mx-auto md:hidden">
            <div className="relative">
              <label htmlFor="inbox-select" className="sr-only">
                Choose inbox
              </label>
              <select
                id="inbox-select"
                className="rounded-md border-0 bg-none pl-3 pr-8 text-base font-medium text-gray-900 focus:ring-2 focus:ring-indigo-600"
                defaultValue={sidebarNavigation.find((item) => item.current)!.name}
              >
                {sidebarNavigation.map((item) => (
                  <option key={item.name}>{item.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-2">
                <ChevronDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Menu button area */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 sm:pr-6 md:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop nav area */}
          <div className="hidden md:flex md:min-w-0 md:flex-1 md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <div className="relative max-w-2xl text-gray-400 focus-within:text-gray-500">
                <label htmlFor="desktop-search" className="sr-only">
                  Search
                </label>
                <input
                  id="desktop-search"
                  type="search"
                  placeholder="Search"
                  className="block w-full border-transparent pl-12 placeholder-gray-500 focus:border-transparent focus:ring-0 sm:text-sm"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">
                  <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
            </div>
            <div className="ml-10 flex flex-shrink-0 items-center space-x-10 pr-4">
              <nav aria-label="Global" className="flex space-x-10">
                <a href="#" className="text-sm font-medium text-gray-900">
                  Inboxes
                </a>
                <a href="#" className="text-sm font-medium text-gray-900">
                  Reporting
                </a>
                <a href="#" className="text-sm font-medium text-gray-900">
                  Settings
                </a>
              </nav>
              <div className="flex items-center space-x-8">
                <span className="inline-flex">
                  <a href="#" className="-mx-1 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </span>

                <Menu as="div" className="relative inline-block text-left">
                  {session ? (
                    <>
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full" src={session?.user?.image!} alt="" />
                      </Menu.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Your Profile
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                  onClick={() => signOut()}
                                >
                                  Sign Out
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </>
                  ) : (
                    <button 
                      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                      onClick={() => signIn()}
                    >
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Sign In
                      </span>
                    </button>
                  )
                  }
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile menu, show/hide this `div` based on menu open/closed state */}
          <Transition.Root show={mobileMenuOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 md:hidden" onClose={setMobileMenuOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="hidden sm:fixed sm:inset-0 sm:block sm:bg-gray-600 sm:bg-opacity-75" />
              </Transition.Child>

              <div className="fixed inset-0 z-40">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-out duration-150 sm:ease-in-out sm:duration-300"
                  enterFrom="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100"
                  enterTo="transform opacity-100 scale-100  sm:translate-x-0 sm:scale-100 sm:opacity-100"
                  leave="transition ease-in duration-150 sm:ease-in-out sm:duration-300"
                  leaveFrom="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
                  leaveTo="transform opacity-0 scale-110  sm:translate-x-full sm:scale-100 sm:opacity-100"
                >
                  <Dialog.Panel
                    className="fixed inset-0 z-40 h-full w-full bg-white sm:inset-y-0 sm:left-auto sm:right-0 sm:w-full sm:max-w-sm sm:shadow-lg"
                    aria-label="Global"
                  >
                    <div className="flex h-16 items-center justify-between px-4 sm:px-6">
                      <a href="#">
                        <img
                          className="block h-8 w-auto"
                          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                          alt="Your Company"
                        />
                      </a>
                      <button
                        type="button"
                        className="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="sr-only">Close main menu</span>
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="max-w-8xl mx-auto mt-2 px-4 sm:px-6">
                      <div className="relative text-gray-400 focus-within:text-gray-500">
                        <label htmlFor="mobile-search" className="sr-only">
                          Search all inboxes
                        </label>
                        <input
                          id="mobile-search"
                          type="search"
                          placeholder="Search all inboxes"
                          className="block w-full rounded-md border-gray-300 pl-10 placeholder-gray-500 focus:border-indigo-600 focus:ring-indigo-600"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
                          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="max-w-8xl mx-auto py-3 px-2 sm:px-4">
                      {navigation.map((item) => (
                        <Fragment key={item.name}>
                          <a
                            href={item.href}
                            className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                          >
                            {item.name}
                          </a>
                          {item.children.map((child) => (
                            <a
                              key={child.name}
                              href={child.href}
                              className="block rounded-md py-2 pl-5 pr-3 text-base font-medium text-gray-500 hover:bg-gray-100"
                            >
                              {child.name}
                            </a>
                          ))}
                        </Fragment>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 pt-4 pb-3">
                      <div className="max-w-8xl mx-auto flex items-center px-4 sm:px-6">
                        <div className="flex-shrink-0">
                          <img className="h-10 w-10 rounded-full" src={session?.user?.image!} alt="" />
                        </div>
                        <div className="ml-3 min-w-0 flex-1">
                          <div className="truncate text-base font-medium text-gray-800">{session?.user?.name}</div>
                          <div className="truncate text-sm font-medium text-gray-500">{session?.user?.email}</div>
                        </div>
                        <a href="#" className="ml-auto flex-shrink-0 bg-white p-2 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </a>
                      </div>
                      <div className="max-w-8xl mx-auto mt-3 space-y-1 px-2 sm:px-4">
                        {userNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </header>

        {/* Bottom section */}
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Narrow sidebar*/}
          <nav aria-label="Sidebar" className="hidden md:block md:flex-shrink-0 md:overflow-y-auto md:bg-gray-800">
            <div className="relative flex w-20 flex-col space-y-3 p-3">
              {sidebarNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700',
                    'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg'
                  )}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </nav>

          {/* Main area */}
          <main className="min-w-0 flex-1 border-t border-gray-200 lg:flex">
            {/* Primary column */}
            <section
              aria-labelledby="primary-heading"
              className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto lg:order-last"
            >
							<div className="flex flex-row">
								<div className="flex flex-row w-full p-1 border-b border-gray-200 bg-gray-100 h-20 justify-end items-center">
									<button 
										className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
										onClick={() => setShowModal(true)}
									>
									  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              	  		<PlusIcon className="h-6 w-6 ml-5"/>
											New Task
									  </span>
									</button>
								</div>
							</div>

              <div className="flex flex-col w-full mt-3 py-1 px-1 space-y-3">
                {projects ? (
                  projects[currentProject]?.tasks.map((task, i) => (
										<TaskCard 
											name={task.name}
											description={task.description}
											minsWorked={task.minutesWorked}
											tags={task.tags}
											key={i}
										/>
                	))
								): null}
              </div>
            </section>

            {/* Secondary column (hidden on smaller screens) */}
            <aside className="hidden lg:order-first lg:block lg:flex-shrink-0">
              <div className="relative flex h-full w-96 flex-col overflow-y-auto border-r border-gray-200 bg-gray-100">
                <h1 id="primary-heading" className="px-1 underline">
                  Projects
                </h1>
                {projects ? (
                  projects.map((project, i) => (
                    <a
                      key={i}
                      className='group flex items-center px-2 py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer'
											style={currentProject == i ? {
												color: '#111827',
												backgroundColor: '#E5E7EB',
											}: {
												color: '#52525B',
											}}
											onClick={() => setCurrentProject(i)}
                    >
                      {project.name}
                    </a>
                ))): null}
              </div>
            </aside>

						{showModal ? (
							<>
 								<div
          			  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          			>
          			  <div className="relative w-auto my-6 mx-auto max-w-3xl">
          			    {/*content*/}
          			    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          			      {/*header*/}
          			      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
          			        <h3 className="text-3xl font-semibold">
          			          Create Task
          			        </h3>
          			        <button
          			          className="p-1 ml-auto border-gray-100 border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
          			          onClick={() => setShowModal(false)}
          			        >
          			          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
          			            ×
          			          </span>
          			        </button>
          			      </div>
          			      {/*body*/}
          			      <div className="relative p-6 flex-auto">
												<form>
													<div className="mb-6">
												    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
												    <input 
															type="text" 
															id="default-input" 
															className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
															onChange={e => setnewTaskName(e.target.value)}
														/>
													</div>
													<div className="mb-6">
														<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
														<textarea 
															className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."
															onChange={e => setnewTaskDescrip(e.target.value)}
														>
														</textarea>
													</div>
												</form>
          			      </div>
          			      {/*footer*/}
          			      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
          			        <button
          			          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          			          type="button"
          			          onClick={() => setShowModal(false)}
          			        >
          			          Close
          			        </button>
          			        <button
          			          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          			          type="button"
          			          onClick={() => {
														addTask({
															name: newTaskName,
															description: newTaskDescrip,
															projectId: 1,
															userId: session?.user?.id!,
														})
														setShowModal(false)
													}}
          			        >
          			          Create Task
          			        </button>
          			      </div>
          			    </div>
          			  </div>
          			</div>
          			<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
							</>
						): null}
          </main>
        </div>
      </div>
    </>
  )
};

export default HomePage;

