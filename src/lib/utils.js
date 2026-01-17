/**
 * Utility function to merge class names
 * Similar to clsx/classnames libraries
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
