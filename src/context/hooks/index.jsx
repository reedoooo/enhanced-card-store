// Import custom hooks
import useFetch from './useFetch';
import useFetchWrapper from './useFetchWrapper';
import useMap from './useMap';
import useIdle from './useIdle';
import useCounter from './useCounter';
import useList from './useList';
import useObjectState from './useObjectState';
import usePrevious from './usePrevious';
import usePagination from './usePagination';
import useSet from './useSet';
import useToggle from './useToggle';
import useSnackBar from './useSnackBar';
import { useVisible } from './useVisible';
import useLogger from './useLogger';
import useDialog from './useDialog';
import useApiResponseHandler from './useApiResponseHandler';

/**
 * Hook: useLogger
 * Description: Logs component lifecycle events, state changes, and custom events.
 * Useful for debugging, monitoring, or performance optimization.
 * @param {string} componentName - The name of the component.
 * @param {object} [options] - Optional settings for the logger.
 * @returns {Function} - Function to log custom events.
 */
const { logEvent, setStateAndLog } = useLogger('ComponentName', {});

/**
 * Hook: useFetch
 * Description: Manages data fetching with loading and error states.
 * Used for fetching data from an API and automatically updates the component when the data is retrieved.
 * @param {string} url - The URL to fetch data from.
 * @returns {
 * data: Object,
 * loading: boolean,
 * error: string
 * }
 * Used By:
 * @function CollectionForm - src/components/forms/CollectionForm.jsx
 * - src/components/forms/CollectionForm.jsx
 */
const { data, loading, error } = useFetch('API_URL');

/**
 * Hook: useFetchWrapper
 * Description: Manages data fetching with loading and error states.
 * Used for fetching data from an API and automatically updates the component when the data is retrieved.
 * @param {string} url - The URL to fetch data from.
 * @param {string} method - The HTTP method to use for the request.
 * @returns {JSON} - The response data from the API.
 * Used By:
 * @function CollectionForm - src/components/forms/CollectionForm.jsx
 */
const fetchWrapper = useFetchWrapper();

/**
 * Hook: useMap
 * Description: Provides functionalities to manipulate map object.
 * Useful for managing key-value pairs with add, delete, and clear operations.
 */
const { map, setMap, deleteKey, clear, get, has } = useMap();

/**
 * Hook: useIdle
 * Description: Detects user inactivity over a specified duration.
 * Can trigger actions like auto-logout or UI changes when the user is idle.
 * @param {number} timeout - The timeout in milliseconds to consider the user idle.
 * @param {function} onIdle - The function to call when the user is idle.
 * @returns {boolean} - The idle state of the user.
 */
const { isIdle } = useIdle(1000, () => console.log('User is idle!'));

/**
 * Hook: useCounter
 * Description: Manages a counter state with increment, decrement, and reset functionalities.
 * Ideal for counters, numeric inputs, or pagination components.
 */
const { count, increment, decrement, reset } = useCounter();
/**
 * Hook: useList
 * Description: Manages list states with add, remove, and update functionalities.
 * Useful for dynamic lists or arrays in your UI, like a to-do list.
 */
const { list, add, remove, update, clearList } = useList();

/**
 * Hook: useObjectState
 * Description: Manages an object state with nested object support.
 * Useful for managing complex states with multiple values.
 * @returns {
 * objectState: Object - The current state object.
 * setObjectState: Function - Function to update the state object.
 * setNestedState: Function - Function to update a nested state.
 * }
 */

const [objectState, setObjectState, setNestedState] = useObjectState();

/**
 * Hook: usePrevious
 * Description: Keeps track of the previous value of a state or prop.
 * Useful in comparison scenarios or detecting changes in values over time.
 * @param {*} value - The value to track.
 */
const { previousValue } = usePrevious();

/**
 * Hook: usePagination
 * Description: Manages pagination logic like current page and items per page.
 * Ideal for implementing pagination on lists or data fetched from APIs.
 */
const { currentPage, itemsPerPage, setItemsPerPage, setCurrentPage } =
  usePagination();

/**
 * Hook: useSet
 * Description: Manages a Set with functionalities like add, delete, and clear.
 * Useful for handling unique values, like in filtering or selection scenarios.
 */
const { set, addSetItem, removeSetItem, clearSet } = useSet();

/**
 * Hook: useToggle
 * Description: Toggles a boolean state, useful for handling binary states like open/close, show/hide.
 * Commonly used in modals, dropdowns, or toggling UI elements.
 */
const [isToggled, toggle] = useToggle();

/**
 * Hook: useSnackBar
 * Description: Manages snack bar notifications in the application.
 * Useful for showing temporary messages or alerts to the user.
 */
const { openSnackBar, closeSnackBar } = useSnackBar();

/**
 * Hook: useVisible
 * Description: Manages visibility states for various components or sections.
 * Allows setting visibility individually for named elements.
 * @returns {
 * isVisible: Function - Function to check if a named element is visible.
 * show: Function - Function to show a named element.
 * hide: Function - Function to hide a named element.
 * toggle: Function - Function to toggle the visibility of a named element.
 * }
 * Example:
 * const { isVisible, show, hide, toggleVisible } = useVisible();
 */
const { isVisible, show, hide, toggleVisible } = useVisible();

/**
 * Hook: useDialog
 * Description: Manages dialog states for various components or sections.
 * Allows setting visibility individually for named elements.
 * @returns {
 * openDialog: Function - Function to open a named dialog.
 * closeDialog: Function - Function to close a named dialog.
 * isDialogOpen: Function - Function to check if a named dialog is open.
 * }
 */

/**
 * Hook: useApiResponseHandler
 * Description: Handles API response data and logs the details.
 * Useful for handling API responses and logging the details to the console.
 * @returns {
 * handleApiResponse: Function - Function to handle the API response.
 * }
 */
