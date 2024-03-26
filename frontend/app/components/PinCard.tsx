'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/ui/card';
import { Product } from '../types';
import { Button } from '../ui/button';

export function PinCard({
  modal,
  setModal,
  handleFieldValue,
  pinMutation,
  unoccupiedPositions,
}: {
  modal: {
    isVisible: boolean;
    product: Product | null;
    position: string;
  };
  setModal: React.Dispatch<
    React.SetStateAction<{
      isVisible: boolean;
      product: Product | null;
      position: string;
    }>
  >;
  handleFieldValue: (value: string) => void;
  pinMutation: (product: Product, position: string) => void;
  unoccupiedPositions: string[];
}) {
  return (
    <div
      className={`fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center ${
        modal.isVisible ? 'block' : 'hidden'
      }`}
    >
      <Card className="bg-white p-4 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle>
            <div className="flex flex-column justify-between items-center gap-16">
              <div>Set Pin for Product</div>
              <Button
                className="cursor-pointer"
                onClick={() =>
                  setModal({
                    isVisible: false,
                    product: null,
                    position: '',
                  })
                }
                variant="ghost"
              >
                X
              </Button>
            </div>
          </CardTitle>
          <CardDescription>{modal.product?.sku}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <Select onValueChange={handleFieldValue}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Available positions" />
            </SelectTrigger>
            <SelectContent className="w-[180px]">
              {unoccupiedPositions.map((position) => (
                <SelectItem
                  key={position}
                  value={position}
                  onClick={() =>
                    setModal({
                      isVisible: true,
                      product: modal.product,
                      position: String(position),
                    })
                  }
                >
                  {position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            disabled={!modal.position}
            onClick={() => {
              pinMutation(modal.product as Product, modal.position as string);
            }}
          >
            Pin
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
