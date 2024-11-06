document.addEventListener("DOMContentLoaded", () => {
    let selectedOption1 = "INR"; // Default selected option for dropdown-1
    let selectedOption2 = ""; // Store the selected option for dropdown-2
  
    const tableBody = document.getElementById("data-table-body");
    const dropdown1Content = document.getElementById("dropdown1-content");
    const dropdown2Content = document.getElementById("dropdown2-content");
    const dropdown1Btn = document.getElementById("dropdown1-btn");
    const dropdown2Btn = document.getElementById("dropdown2-btn");
    const actionButton = document.getElementById("action-button");
  
    // Function to populate the table with data
    const populateTable = (data) => {
      tableBody.innerHTML = ""; // Clear any previous rows
      data.forEach((item) => {
        const row = document.createElement("tr");
        const { _id, __v, ...itemWithoutId } = item; // Exclude _id and __v properties
        Object.values(itemWithoutId).forEach((value) => {
          const cell = document.createElement("td");
          cell.textContent = value;
          row.appendChild(cell);
        });
        tableBody.appendChild(row);
      });
    };
  
    // Function to populate the dropdowns
    const populateDropdowns = (data) => {
      // Dropdown 1: Static option "INR"
      dropdown1Content.innerHTML = ""; // Clear existing options
      const inrOption = document.createElement("a");
      inrOption.href = "#";
      inrOption.textContent = "INR";
      inrOption.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        selectedOption1 = "INR"; // Set selectedOption1 to INR
        dropdown1Btn.innerHTML = "INR"; // Update the button text
        dropdown1Content.style.display = "none"; // Close the dropdown after selection
      });
      dropdown1Content.appendChild(inrOption);
  
      // Dropdown 2: Unique base units from the data
      dropdown2Content.innerHTML = ""; // Clear existing options
      const uniqueBaseUnits = [...new Set(data.map((item) => item.base_unit))]; // Unique base units from data
      uniqueBaseUnits.forEach((baseUnit) => {
        const baseUnitOption = document.createElement("a");
        baseUnitOption.href = "#";
        baseUnitOption.textContent = baseUnit;
        baseUnitOption.addEventListener("click", (e) => {
          e.preventDefault(); // Prevent default anchor behavior
          selectedOption2 = baseUnit; // Set selectedOption2 to selected base unit
          actionButton.innerHTML = `Buy ${selectedOption2}`; // update buy button
          dropdown2Btn.innerHTML = baseUnit; // Update the button text
          dropdown2Content.style.display = "none"; // Close the dropdown after selection
        });
        dropdown2Content.appendChild(baseUnitOption);
      });
  
      // Set default values after populating
      dropdown1Btn.innerHTML = selectedOption1; // Ensure dropdown-1 has the correct default option
      dropdown2Btn.innerHTML = selectedOption2 || "Select Base "; // Set a default or placeholder for dropdown-2
    };
  
    // Function to toggle the dropdown visibility
    const toggleDropdown = (dropdown) => {
      if (dropdown.style.display === "block") {
        dropdown.style.display = "none"; // If it's already open, close it
      } else {
        dropdown.style.display = "block"; // Otherwise, open it
      }
    };
  
    // Event listeners for toggling dropdowns on button click
    dropdown1Btn.addEventListener("click", () => {
      toggleDropdown(dropdown1Content); // Toggle dropdown-1 visibility
    });
  
    dropdown2Btn.addEventListener("click", () => {
      toggleDropdown(dropdown2Content); // Toggle dropdown-2 visibility
    });
  
    // Function to fetch data from API and populate the HTML
    const fetchDataAndPopulate = async () => {
      try {
        const response = await fetch("/api/data"); // Replace with your API endpoint
        const data = await response.json();
  
        // Populate table and dropdowns with fetched data
        populateTable(data);
        populateDropdowns(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    // Initial call to fetch data and populate HTML
    fetchDataAndPopulate();
  });
  