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
      <Card className="min-w-[300px] max-w-[400px] w-1/2 h-1/2 bg-white p-4 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle>
            <div className="flex flex-column justify-between items-center">
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
          <CardDescription>Set the position for the product</CardDescription>
        </CardHeader>
        <CardContent>
          <Select onValueChange={handleFieldValue}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Available positions" />
            </SelectTrigger>
            <SelectContent>
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
