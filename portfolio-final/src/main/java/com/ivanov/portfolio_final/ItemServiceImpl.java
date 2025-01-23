package com.ivanov.portfolio_final;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public List<ItemResponseDTO> getAllItems() {
        List<Item> items = itemRepository.findAll();

        List<ItemResponseDTO> itemResponseDTOs = new ArrayList<>();
        for (Item item : items) {
            ItemResponseDTO itemResponseDTO = new ItemResponseDTO();
            BeanUtils.copyProperties(item, itemResponseDTO);
            itemResponseDTOs.add(itemResponseDTO);
        }

        return itemResponseDTOs;
    }
}
