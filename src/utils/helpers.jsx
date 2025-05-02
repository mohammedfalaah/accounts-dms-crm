import moment from 'moment';

// Function to format date as dd-mm-yyyy
export const  formatDate=(dateString)=> {
    return moment(dateString).format('DD MMM YYYY');
}

export function Capitalize(word) {
    if (!word) {
      return ''; 
    }
    const words = word.split('_');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
  }
  
  export const getStartAndEndOfWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startDateOfWeek = new Date(today);
    startDateOfWeek.setDate(today.getDate() - dayOfWeek);
    const endDateOfWeek = new Date(today); 
    endDateOfWeek.setDate(today.getDate() + (6 - dayOfWeek)); 
    return { startDateOfWeek, endDateOfWeek };
};
export const getStartAndEndOfMonth = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const startDateOfMonth = new Date(year, month, 1); 
    const endDateOfMonth = new Date(year, month + 1, 0); 
    return { startDateOfMonth, endDateOfMonth };
};



export const paramsDateFormat = (date) => {
    if (date === null) return null;
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  

export const formatParam = (param) => {
    if (param === "week") {
        const { startDateOfWeek, endDateOfWeek } = getStartAndEndOfWeek();
        return { from_date: paramsDateFormat(startDateOfWeek), to_date:paramsDateFormat(endDateOfWeek) };   
    }
    if (param === "today") {
        return { from_date: paramsDateFormat(new Date()), to_date:paramsDateFormat(new Date()) };   
    }
    if (param === "month") {
        const { startDateOfMonth, endDateOfMonth } = getStartAndEndOfMonth();

        return { from_date: paramsDateFormat(startDateOfMonth), to_date:paramsDateFormat(endDateOfMonth) };   
    }
};



export const calculatePercentageIncrease = (current, previous) => {
    if (current == null || previous == null) {
        return null;
    }
    if (previous === 0&&current===0) {
        return 0
    }
    return ((current - previous) / previous) * 100;
};

export const percentIncrease = (data) => {
    const totalLeadCurrent = data?.total_leads_cur;
    const totalLeadPrev = data?.total_leads_prev;
    const orderTotal = data?.total_orders_cur;
    const orderPrev = data?.total_orders_prev;
    const pendingOrderCurrent = data?.pending_orders_cur;
    const pendingOrderPrev = data?.pending_orders_prev;

    const percentageIncreaseInLead = calculatePercentageIncrease(totalLeadCurrent, totalLeadPrev);
    const percentageIncreaseInOrder = calculatePercentageIncrease(orderTotal, orderPrev);
    const percentageIncreaseInPendingOrder = calculatePercentageIncrease(pendingOrderCurrent, pendingOrderPrev);
    

    return {
        percentageIncreaseInLead,
        percentageIncreaseInOrder,
        percentageIncreaseInPendingOrder
    };
};
