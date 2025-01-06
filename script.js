$(document).ready(function () {
    // --- Stall Status Management ---
    $('#toggle-status').on('click', function () {
        let currentStatus = localStorage.getItem('stallStatus') || 'Closed';
        let newStatus = currentStatus === 'Open' ? 'Closed' : 'Open';

        localStorage.setItem('stallStatus', newStatus);
        $('#current-status').text(newStatus);
        alert('Stall status updated to: ' + newStatus);
    });

    let storedStatus = localStorage.getItem('stallStatus') || 'Closed';
    $('#current-status').text(storedStatus);

    // --- Queue Management ---
    let currentOrder = Number(localStorage.getItem('currentOrder') || 0);
    let readyOrder = Number(localStorage.getItem('readyOrder') || 0);

    // Stall Owner: Next Order
    $('#next-order').on('click', function () {
        currentOrder++;
        localStorage.setItem('currentOrder', currentOrder);
        $('#current-order').text(currentOrder);
    });

    // Stall Owner: Mark Order as Ready
    $('#order-ready').on('click', function () {
        if (readyOrder < currentOrder) {
            readyOrder++;
            localStorage.setItem('readyOrder', readyOrder);
            $('#ready-order').text(readyOrder);
        } else {
            alert('No pending orders to mark as ready!');
        }
    });

    // Reset Queue Logic
    $('#reset-queue').on('click', function () {
        if (confirm("Are you sure you want to reset the queue for the next day?")) {
            // Reset values in localStorage
            currentOrder = 0;
            readyOrder = 0;

            localStorage.setItem('currentOrder', currentOrder);
            localStorage.setItem('readyOrder', readyOrder);
            localStorage.setItem('customerQueue', 0);

            // Reset display values
            $('#current-order').text(currentOrder);
            $('#ready-order').text(readyOrder);

            alert('Queue has been reset successfully for the next day.');
        }
    });

    // Display initial values on page load
    $('#current-order').text(currentOrder);
    $('#ready-order').text(readyOrder);

    // --- Customer Queue Management ---
    let customerQueue = Number(localStorage.getItem('customerQueue') || 0);

    // Customer: Get Queue Number
    $('#get-queue').on('click', function () {
        customerQueue = currentOrder + 1;
        localStorage.setItem('customerQueue', customerQueue);
        $('#customer-queue').text(customerQueue);
        alert('Your queue number is: ' + customerQueue);
    });

    // Customer: Check if Order is Ready
    setInterval(function () {
        let readyOrder = Number(localStorage.getItem('readyOrder') || 0);
        let customerQueue = Number(localStorage.getItem('customerQueue') || 0);

        if (customerQueue > 0 && customerQueue <= readyOrder) {
            $('#order-notification').text('Your order is ready!');
        } else {
            $('#order-notification').text('');
        }
    }, 1000);
});
