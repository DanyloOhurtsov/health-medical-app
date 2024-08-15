import * as React from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ScrollArea } from "./scroll-area";
import { Button } from "@/components/ui/button";
import flags from "react-phone-number-input/flags";
import * as RPNInput from "react-phone-number-input";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { Input, InputProps } from "@/components/ui/input";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type PhoneInputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
> &
    Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
        onChange?: (value: RPNInput.Value | "") => void;
    };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
    React.forwardRef<
        React.ElementRef<typeof RPNInput.default>,
        PhoneInputProps
    >(({ className, onChange, value, ...props }, ref) => {
        const [selectedCountry, setSelectedCountry] = useState<
            RPNInput.Country | undefined
        >(props.defaultCountry);

        const handleCountryChange = (country: RPNInput.Country) => {
            setSelectedCountry(country);
            const countryCode = `+${RPNInput.getCountryCallingCode(country)}`;
            // Додаємо код країни до початку введеного значення
            onChange?.(countryCode as RPNInput.Value | "");
        };

        return (
            <RPNInput.default
                ref={ref}
                className={cn("flex w-full", className)}
                flagComponent={FlagComponent}
                countrySelectComponent={(props) => (
                    <CountrySelect
                        {...props}
                        value={selectedCountry}
                        onChange={handleCountryChange}
                    />
                )}
                inputComponent={InputComponent}
                country={selectedCountry}
                value={value}
                limitMaxLength={true}
                onChange={(value) =>
                    onChange?.(value || ("" as RPNInput.Value | ""))
                }
                {...props}
            />
        );
    });
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        return (
            <Input
                className={cn(
                    "rounded-none border-0 ring-0 outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                    className
                )}
                placeholder={props.placeholder}
                {...props}
                ref={ref}
            />
        );
    }
);
InputComponent.displayName = "InputComponent";

type CountrySelectOption = { label: string; value: RPNInput.Country };

type CountrySelectProps = {
    disabled?: boolean;
    value: RPNInput.Country;
    onChange: (value: RPNInput.Country) => void;
    options: CountrySelectOption[];
};

const CountrySelect = ({
    disabled,
    value,
    onChange,
    options,
}: CountrySelectProps) => {
    const handleSelect = React.useCallback(
        (country: RPNInput.Country) => {
            onChange(country);
        },
        [onChange]
    );

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant={"outline"}
                    className={cn(
                        "flex gap-1 rounded-e-none rounded-s-lg px-1 border-0 ml-1"
                    )}
                    disabled={disabled}
                >
                    <FlagComponent country={value} countryName={value} />
                    <ChevronsUpDown
                        className={cn(
                            "-mr-2 h-4 w-4 opacity-50",
                            disabled ? "hidden" : "opacity-100"
                        )}
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0 bg-dark-400 border-dark-500 border rounded-md">
                <Command>
                    <CommandList className="border border-dark-400">
                        <ScrollArea className="h-72">
                            <CommandInput placeholder="Search country..." />
                            <CommandEmpty>No country found.</CommandEmpty>
                            <CommandGroup>
                                {options
                                    .filter((x) => x.value)
                                    .map((option) => (
                                        <CommandItem
                                            className="gap-2"
                                            key={option.value}
                                            onSelect={() =>
                                                handleSelect(option.value)
                                            }
                                        >
                                            <FlagComponent
                                                country={option.value}
                                                countryName={option.label}
                                            />
                                            <span className="flex-1 text-sm">
                                                {option.label}
                                            </span>
                                            {option.value && (
                                                <span className="text-foreground/50 text-sm">
                                                    {`+${RPNInput.getCountryCallingCode(
                                                        option.value
                                                    )}`}
                                                </span>
                                            )}
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    option.value === value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                            </CommandGroup>
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
    const Flag = flags[country];

    return (
        <span className="bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm">
            {Flag && <Flag title={countryName} />}
        </span>
    );
};
FlagComponent.displayName = "FlagComponent";

export { PhoneInput };
