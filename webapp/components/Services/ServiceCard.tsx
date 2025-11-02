// components/Services/ServiceCard.tsx
import Link from 'next/link';
import { ServiceData } from '@/types';
import { MapPin, Star, DollarSign } from 'lucide-react';

interface ServiceCardProps {
    service: ServiceData;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
    const priceDisplay = service.priceRange === 'high' ? '$$$' : service.priceRange === 'medium' ? '$$' : '$';

    return (
        <Link href={`/services/${service._id}`} className="block h-full">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
                {/* Image */}
                <div className="w-full h-48 bg-gray-200 overflow-hidden">
                    {service.images.length > 0 ? (
                        <img 
                            src={service.images[0]} 
                            alt={service.name} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                        />
                    ) : (
                         <div className="flex items-center justify-center h-full text-gray-500">
                             
                         </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">{service.name}</h2>
                    
                    <div className="flex items-center justify-between text-sm mb-3">
                        {/* Rating */}
                        <span className="flex items-center text-yellow-500 font-semibold">
                            <Star size={16} fill="currentColor" className="mr-1" />
                            {service.rating.toFixed(1)} ({service.totalReviews} reviews)
                        </span>
                        {/* Price */}
                        <span className="flex items-center text-green-600 font-semibold">
                            <DollarSign size={16} className="mr-1" />
                            {priceDisplay}
                        </span>
                    </div>

                    {/* Location & Partner */}
                    <div className="mt-auto space-y-1 text-gray-600 text-sm">
                        <p className="flex items-center">
                            <MapPin size={16} className="mr-1 flex-shrink-0" />
                            {service.city}
                        </p>
                        <p className="line-clamp-1">
                            **Đối tác:** {service.partnerId.name}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ServiceCard;