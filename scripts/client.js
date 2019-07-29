$('document').ready(handleReady);

let employeeList = [];
// store employees as objects in this array, use later to update DOM from array

function handleReady() {
	// $('#employeeForm').submit(handleSubmit);
	$('#employeeForm').submit(handleSubmit);
	$('#tableContainer').on('click', '.deleteButton', handleDelete);
	updateTable();
}

function handleDelete() {
	//remove from employee array
	let idNumber = $(this)
		.parent()
		.siblings('.emp-ID')
		.text();
	//finds idnumber of employee to remove
	//filters employee list to remove the employee with matching number
	employeeList = employeeList.filter(
		employee => employee.employeeID !== idNumber
	);

	updateTable();
}

function handleSubmit() {
	event.preventDefault(); // prevents refresh/default action of form submission

	let inputFields = $('#employeeForm :input');
	//selector for finding all input fields

	let employee = {};
	inputFields.each(function() {
		// console.log($(this).attr('name'), $(this).val());
		employee[$(this).attr('name')] = $(this).val();
	});

	let matchingIds = employeeList.filter(
		emp => emp.employeeID === employee.employeeID
	);
	//checks employee list array to find any IDs that match the input ID

	if (matchingIds.length > 0) {
		alert(
			'Employee ID# already present in table.  Check number and re-submit.'
		);
		return;
	}
	//throws alert and stops the function from adding the employee to the DOM/stored array

	employee.salary = Number(employee.salary);
	//convert salary from str to int

	employeeList.push(employee); // adds to list arary to contain all employees

	inputFields.val('');
	updateTable();
	//updtes from list, not from input
}

function updateTable() {
	$('#employeeTableBody').empty();
	for (let employee of employeeList) {
		let html = `<tr>
      <td class="emp-ID">${employee.employeeID}</td>
      <td class="name-first">${employee.firstName}</td>
      <td class="name-last">${employee.lastName}</td>
      <td class="emp-title">${employee.title}</td>
      <td class="emp-salary">${employee.salary.toLocaleString('en', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
				style: 'currency',
				currency: 'USD',
				currencyDisplay: 'symbol'
			})}</td>
      <td>
				<button
					type="button"
					class="deleteButton btn btn-info btn-block"
					>
					Delete
        </button>
        </td>
      </tr>`;
		$('#employeeTableBody').append(html);
	}

	let monthlyCost = calculateMonthlyCost();

	$('#totalMonthlyCost').text(
		`${monthlyCost.toLocaleString('en', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
			style: 'currency',
			currency: 'USD',
			currencyDisplay: 'symbol'
		})}`
	); // parses cost to readable display in USD

	if (monthlyCost > 20000) {
		$('#totalMonthlyCost')
			.parent()
			.addClass('d-inline-block bg-danger rounded');
	} else {
		$('#totalMonthlyCost')
			.parent()
			.removeClass('bg-danger');
	} //updates background color to red if over 20000
}

function calculateMonthlyCost() {
	let totalAnnualCost = 0;
	for (let employee of employeeList) {
		totalAnnualCost += employee.salary;
	}
	let monthlyCost = totalAnnualCost / 12;
	return monthlyCost;
}
