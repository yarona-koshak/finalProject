// // document.getElementById('orderBtn')?.addEventListener('click', () => {
// //     const eventSelect = <HTMLSelectElement>document.getElementById('event');
// //     const quantityInput = <HTMLInputElement>document.getElementById('quantity');
// //     const orderSummary = <HTMLDivElement>document.getElementById('orderSummary');
// //     const orderDetails = <HTMLParagraphElement>document.getElementById('orderDetails');

// //     const selectedEvent = eventSelect.value;
// //     const quantity = parseInt(quantityInput.value);

// //     if (quantity < 1) {
// //         alert('Please enter a valid ticket quantity.');
// //         return;
// //     }

// //     const ticketPrice = getEventPrice(selectedEvent);
// //     const totalPrice = ticketPrice * quantity;

// //     orderDetails.innerHTML = `
// //         Event: ${capitalizeEventName(selectedEvent)}<br>
// //         Tickets: ${quantity}<br>
// //         Price per Ticket: $${ticketPrice}<br>
// //         Total Price: $${totalPrice}
// //     `;

// //     orderSummary.style.display = 'block';
// // });

// // function getEventPrice(event: string): number {
// //     switch (event) {
// //         case 'concert': return 50;
// //         case 'movie': return 12;
// //         case 'theater': return 40;
// //         default: return 0;
// //     }
// // }

// // function capitalizeEventName(event: string): string {
// //     return event.charAt(0).toUpperCase() + event.slice(1);
// // }

let orderBtn = document.getElementById("orderBtn") as HTMLButtonElement;
let box = document.querySelector(".box") as HTMLDivElement;

orderBtn.onclick = function() {
  box.classList.add("box2");
};