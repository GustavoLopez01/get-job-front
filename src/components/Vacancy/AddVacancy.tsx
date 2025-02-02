import {
	ChangeEvent,
	FormEvent,
	useState
} from 'react'
import { useNavigate } from 'react-router'
import { saveJob } from '../../api/job-api'
import MyMap from './Map'
import { validateFields } from '../../helpers'
import { CATEGORIES } from '../../constants'
import type { Job, JobToSave, MapStreet } from '../../types'

const initialState = {
	name: '',
	description: '',
	salary: 0,
	active: true,
	showSalary: true,
	details: 'test',
	address: ''
}

const initialStateMap = {
	address: {
		city: '',
		country_code: '',
		postcode: '',
		road: '',
		state: ''
	},
	lat: '',
	lon: '',
	display_name: ''
}

export default function AddVacancy() {
	const navigate = useNavigate()
	const [vacancy, setVacancy] = useState<JobToSave>(initialState)
	const [mapStreet, setMapStreet] = useState<MapStreet>(initialStateMap)
	const [errors, setErrors] = useState('')

	const handleChange = (event: ChangeEvent<HTMLInputElement> |
		ChangeEvent<HTMLTextAreaElement> |
		ChangeEvent<HTMLSelectElement>) => {
		try {
			const { name, value } = event.target
			setVacancy({
				...vacancy,
				[name]: value
			})
		} catch (error) {
			console.error(error);
		}
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault()
			const jobToSave = {
				...vacancy,
				address: JSON.stringify(mapStreet)
			}

			const isValidValues = validateFields(jobToSave)
			if (!isValidValues) {
				setErrors('Existen campos vacíos que son requeridos.')
				return
			}

			const response: Job = await saveJob({
				...vacancy,
				address: JSON.stringify(mapStreet)
			})
			if (response.id) {
				navigate("/my-vacancies")
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<div className="w-full py-6 px-5">
				<form
					onSubmit={handleSubmit}
					autoComplete="off"
					className="flex flex-col gap-1"
				>
					<div className="grid md:grid-cols-2 grid-cols-1 gap-4">
						<div className="flex flex-col">
							<label
								htmlFor="name"
								className="font-roboto-bold"
							>
								Nombre de la vacante
							</label>
							<input
								id="name"
								name="name"
								type="text"
								className="w-full h-9 rounded-full outline-hidden px-4 text-black placeholder:text-black text-sm font-roboto-light border-[1px]"
								placeholder="Ejemplo: Desarrollador de software"
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col">
							<label
								htmlFor="category"
								className="font-roboto-bold"
							>
								Categoria
							</label>
							<select
								className="w-full h-9 rounded-full outline-hidden px-4 text-black placeholder:text-black text-sm font-roboto-light border-[1px]"
								id="category"
								name="category"
								onChange={handleChange}
							>
								<option>-- Selecciona una opción --</option>
								{CATEGORIES.map((category) => (
									<option
										key={category.value}
										value={category.value}
									>
										{category.label}
									</option>
								))}
							</select>
						</div>

						<div className="flex flex-col">
							<label
								htmlFor="salary"
								className="font-roboto-bold"
							>
								Salario
							</label>
							<input
								id="salary"
								name="salary"
								type="number"
								className="w-full h-9 rounded-full outline-hidden px-4 text-black placeholder:text-black text-sm font-roboto-light border-[1px]"
								placeholder="Ejemplo: 10000"
								onChange={handleChange}
								min={0}
							/>
						</div>

						<div className="flex flex-col w-full ">
							<label
								className="font-roboto-bold"
							>
								¿Deseas mostrar el salario en la vacante?
							</label>
							<div className="flex justify-between pt-2">
								<div className="flex justify-center gap-2 w-1/2">
									<label htmlFor="yes">Si</label>
									<input
										type="radio"
										id="yes"
										value="1"
										name="showSalary"
										className="w-5"
										onChange={handleChange}
									/>
								</div>
								<div className="flex justify-center gap-2 w-1/2">
									<label htmlFor="no">No</label>
									<input
										type="radio"
										id="no"
										value="0"
										name="showSalary"
										className="w-5"
										onChange={handleChange}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col pt-4">
						<label
							htmlFor="description"
							className="font-roboto-bold"
						>
							Descripción
						</label>
						<textarea
							id="description"
							name="description"
							className="w-full h-9 rounded-[10px] outline-hidden px-4 py-2 text-black placeholder:text-black text-sm font-roboto-light border-[1px] min-h-24 resize-none"
							placeholder="Ejemplo: Conocimientos en algun software de control de versiones - Git, GitLab"
							onChange={handleChange}
						/>
					</div>

					<div className="h-[380px] flex flex-col gap-3">
						<div className="mt-5 h-[350px]">
							<MyMap setMapStreet={setMapStreet} />
						</div>
						<p className="font-roboto-light">
							{mapStreet.display_name}
						</p>
					</div>

					<button
						className="bg-indigo-600 hover:bg-indigo-500 w-full text-white uppercase py-5 px-5 font-roboto-black mt-5 cursor-pointer"
						type="submit"
					>
						+ Agregar
					</button>

					{errors.length > 0 && <span className="text-red-600 font-roboto-bold text-center"> {errors} </span>}
				</form>
			</div>
		</>
	)
}
